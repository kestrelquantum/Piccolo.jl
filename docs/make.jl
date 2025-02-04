# Script to build the MultiDocumenter demo docs
#
#   julia --project docs/make.jl [--temp] [deploy]
#
# When `deploy` is passed as an argument, it goes into deployment mode
# and attempts to push the generated site to gh-pages. You can also pass
# `--temp`, in which case the source repositories are cloned into a temporary
# directory (as opposed to `docs/clones`).
using Piccolo
using MultiDocumenter
using Documenter
using Literate

push!(LOAD_PATH, joinpath(@__DIR__, "..", "src"))

@info "Building Documenter site for Piccolo.jl"
open(joinpath(@__DIR__, "src", "index.md"), write = true) do io
    for line in eachline(joinpath(@__DIR__, "..", "README.md"))
        if occursin("<!--", line) && occursin("-->", line)
            comment_content = match(r"<!--(.*)-->", line).captures[1]
            write(io, comment_content * "\n")
        else
            write(io, line * "\n")
        end
    end
end

pages = [
    "Home" => "index.md",
    "Quickstart" => "generated/quickstart.md",
    "Examples" => ["generated/multilevel_transmon.md"],
    "Contribution Guide" => "contribution_guide.md",
    "Release Notes" => "release_notes.md",
]

format = Documenter.HTML(;
    prettyurls = get(ENV, "CI", "false") == "true",
    canonical = "https://kestrelquantum.github.io/",
    edit_link = "main",
    assets = String[],
    mathengine = MathJax3(
        Dict(
            :loader => Dict("load" => ["[tex]/physics"]),
            :tex => Dict(
                "inlineMath" => [["\$", "\$"], ["\\(", "\\)"]],
                "tags" => "ams",
                "packages" => ["base", "ams", "autoload", "physics"],
            ),
        ),
    ),
)

src = joinpath(@__DIR__, "src")
lit = joinpath(@__DIR__, "literate")

lit_output = joinpath(src, "generated")

for (root, _, files) ∈ walkdir(lit), file ∈ files
    splitext(file)[2] == ".jl" || continue
    ipath = joinpath(root, file)
    opath = splitdir(replace(ipath, lit => lit_output))[1]
    Literate.markdown(ipath, opath)
end

makedocs(;
    modules = [Piccolo],
    sitename = "Piccolo.jl",
    format = format,
    pages = pages,
    warnonly = true,
)

# MultiDocumenter
# ---------------

clonedir = ("--temp" in ARGS) ? mktempdir() : joinpath(@__DIR__, "clones")
outpath = mktempdir()
@info """
Cloning packages into: $(clonedir)
Building aggregate site into: $(outpath)
"""

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
        upstream = joinpath(clonedir, "PiccoloQuantumObjects"),
        path = "PiccoloQuantumObjects",
        name = "Quantum Objects",
        giturl = "https://github.com/kestrelquantum/PiccoloQuantumObjects.jl.git",
    ),
    MultiDocumenter.DropdownNav(
        "Optimal Controls",
        [
            MultiDocumenter.MultiDocRef(
                upstream = joinpath(clonedir, "QuantumCollocation"),
                path = "QuantumCollocation",
                name = "QuantumCollocation.jl",
                giturl = "https://github.com/kestrelquantum/QuantumCollocation.jl.git",
                # or use ssh instead for private repos:
                # giturl = "git@github.com:JuliaComputing/DataSets.jl.git",
            ),
            MultiDocumenter.MultiDocRef(
                upstream = joinpath(clonedir, "QuantumCollocationCore"),
                path = "QuantumCollocationCore",
                name = "QuantumCollocationCore.jl",
                giturl = "https://github.com/kestrelquantum/QuantumCollocationCore.jl.git",
            ),
        ],
    ),
    MultiDocumenter.DropdownNav(
        "Trajectories",
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
    MultiDocumenter.MultiDocRef(
        upstream = joinpath(clonedir, "PiccoloPlots"),
        path = "PiccoloPlots",
        name = "Plots",
        giturl = "https://github.com/kestrelquantum/PiccoloPlots.jl.git",
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
