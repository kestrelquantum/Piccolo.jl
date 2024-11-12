# Script to build the MultiDocumenter demo docs
#
#   julia --project docs/make.jl [--temp] [deploy]
#
# When `deploy` is passed as an argument, it goes into deployment mode
# and attempts to push the generated site to gh-pages. You can also pass
# `--temp`, in which case the source repositories are cloned into a temporary
# directory (as opposed to `docs/clones`).
using MultiDocumenter
using Piccolo
import Documenter

clonedir = ("--temp" in ARGS) ? mktempdir() : joinpath(@__DIR__, "clones")
outpath = mktempdir()
@info """
Cloning packages into: $(clonedir)
Building aggregate site into: $(outpath)
"""

@info "Building Documenter site for Piccolo.jl"
open(joinpath(@__DIR__, "src", "index.md"), write = true) do io
    write(io, read(joinpath(@__DIR__, "..", "README.md")))
    write(
        io,
        """

## Docstrings

```@autodocs
Modules = [Piccolo]
```
""",
    )
end

Documenter.makedocs(
    sitename = "Piccolo",
    modules = [Piccolo],
    warnonly = true,
    pages = ["index.md"],
)

@info "Building aggregate MultiDocumenter site"
docs = [
    # We also add MultiDocumenter's own generated pages
    MultiDocumenter.MultiDocRef(
        upstream = joinpath(@__DIR__, "build"),
        path = "docs",
        name = "Piccolo",
        fix_canonical_url = false,
    ),
    MultiDocumenter.MultiDocRef(
        upstream = joinpath(clonedir, "QuantumCollocation"),
        path = "QuantumCollocation",
        name = "QuantumCollocation.jl",
        giturl = "https://github.com/kestrelquantum/QuantumCollocation.jl.git",
        # or use ssh instead for private repos:
        # giturl = "git@github.com:JuliaComputing/DataSets.jl.git",
    ),
    MultiDocumenter.DropdownNav(
        "Utilities",
        [
            MultiDocumenter.MultiDocRef(
                upstream = joinpath(clonedir, "NamedTrajectories"),
                path = "NamedTrajectories",
                name = "NamedTrajectories.jl",
                giturl = "https://github.com/kestrelquantum/NamedTrajectories.jl.git",
            ),
            MultiDocumenter.MultiDocRef(
                upstream = joinpath(clonedir, "TrajectoryIndexingUtils"),
                path = "TrajectoryIndexingUtils",
                name = "TrajectoryIndexingUtils.jl",
                giturl = "https://github.com/kestrelquantum/TrajectoryIndexingUtils.jl.git",
            ),
        ],
    ),
]

MultiDocumenter.make(
    outpath,
    docs;
    search_engine = MultiDocumenter.SearchConfig(
        index_versions = ["stable"],
        engine = MultiDocumenter.FlexSearch,
    ),
    rootpath = "/Piccolo.jl/",
    canonical_domain = "https://kestrelquantum.github.io/",
    sitemap = true,
)

if "deploy" in ARGS
    @warn "Deploying to GitHub" ARGS
    gitroot = normpath(joinpath(@__DIR__, ".."))
    run(`git pull`)
    outbranch = "gh-pages"
    has_outbranch = true
    if !success(`git checkout $outbranch`)
        has_outbranch = false
        if !success(`git switch --orphan $outbranch`)
            @error "Cannot create new orphaned branch $outbranch."
            exit(1)
        end
    end
    for file in readdir(gitroot; join = true)
        endswith(file, ".git") && continue
        rm(file; force = true, recursive = true)
    end
    for file in readdir(outpath)
        cp(joinpath(outpath, file), joinpath(gitroot, file))
    end
    run(`git add .`)
    if success(`git commit -m 'Aggregate documentation'`)
        @info "Pushing updated documentation."
        if has_outbranch
            run(`git push`)
        else
            run(`git push -u origin $outbranch`)
        end
        run(`git checkout main`)
    else
        @info "No changes to aggregated documentation."
    end
else
    @info "Skipping deployment, 'deploy' not passed. Generated files in docs/out." ARGS
    cp(outpath, joinpath(@__DIR__, "out"), force = true)
end