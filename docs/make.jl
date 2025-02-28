using Piccolo
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
    canonical = "https://docs.harmoniqs.co/Piccolo.jl",
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

deploydocs(; repo = "github.com/harmoniqs/Piccolo.jl.git", devbranch = "main")
