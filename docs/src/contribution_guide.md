# Contribution Guide

## Introduction

We welcome contributiuons to Piccolo.jl! This document outlines the guidelines for contributing to the project. If you know what you want to see, but are unsure of the best way to achieve it, add an issue on the relevant repository [(like QuantumCollocation.jl)](https://github.com/harmoniqs/QuantumCollocation.jl/issues) and start a discussion with the community! 

### Tips for Visual Studio Code
__Julia extension__ You can run Julia notebooks and much more with [the Julia extension](https://code.visualstudio.com/docs/languages/julia). Upon opening your project folder in VS code and attempting to run an `.ipynb`, you will see that VS Code finds the interpreters managed by juliaup and defaults to using the environment based on the _Project.toml_ in the project directory.

__Fonts__ VS Code will not display all characters allowed by Julia. You can change the editor font family in the settings to `'JuliaMono'` to get full support. If you don't want to mix and mash, you can create a new VS Code settings profile for working in Julia at _File>Preferences>Profile_.

__Tests__ Tests should automatically populate in VS Code when working with a Piccolo package. For example, just by adding the `QuantumCollocation.jl` folder to your workspace, you should see tests appear if you click on the _Testing_ sidebar icon. If you run one of these tests, a new Julia kernel is spawned for the test. You can find the kernel if you click on the _Julia_ sidebar icon (after installing the Julia extensions). Sometimes, for the tests to recognize new changes, you may need to manually kill this kernel to see your changes reflected.

## Developing

__Install Julia__ [Juliaup](https://github.com/JuliaLang/juliaup) is an installer and version manager. This is one useful way to manage Julia versions and keep up with the latest changes. After installing, run `julia` to obtain the Julia _REPL_.

__Julia environments__
[(Documentation)](https://pkgdocs.julialang.org/v1/environments/#Using-someone-else's-project) Your project's environment is stored in _Project.toml_. You can interactively add packages to an environment by using the Julia command line _REPL_ and _package manager_.  Start Julia in the project folder. Type `]` to enter the package manager. Type `activate .` to activate or create an environment specified by _Project.toml_ located in the current folder. Separately, you generate a manifest (solving the versions to create a valid environment) by running `instantiate`; instantiate will check that the environment is correct after you add all the packages you want.

__Adding packages__
[(Documentation)](https://pkgdocs.julialang.org/v1/managing-packages/#Adding-packages) The initial cell for a Piccolo notebook might look something like the following:
```Julia
# Standard packages
using LinearAlgebra
using CairoMakie

# Piccolo
using Piccolo
```

First off are the standard packages (these are like Numpy and Matplotlib). Open the package manager in the current environment (type `julia`, `]`, and `activate .`), type `add LinearAlgebra` to install and precompile _LinearAlgebra_. Same with `CairoMakie`. Second, let's install _Piccolo_. We do `add Piccolo` to get the entire ecosystem as a bundle from the Julia repository.

Sometimes you will want to develop individual Piccolo packages, so our header might look like
```Julia
# Standard packages
using LinearAlgebra
using CairoMakie

# Piccolo packages
using QuantumCollocation
using NamedTrajectories
```

These are two packages (_QuantumCollocation_, _NamedTrajetories_) inside [Piccolo](https://docs.juliahub.com/General/Piccolo/stable/). 

As a developer, we want to use the git repositories directly from [the Kestrel Quantum Github page](https://github.com/harmoniqs). Clone, then add the local packages to the Project file with e.g. `dev ../relative/path/to/repo/QuantumCollocation`. This command installs the development version of _QuantumCollocation_ pointing to the local Github code instead of the package repository. You can repeat this for the others, also.

__Revise__
[Revise.jl](https://timholy.github.io/Revise.jl/stable/) will let you edit source code, update packages, and reload the changes in a notebook---automatically! This is a great tool for development. `add Revise` from the REPL and then include it before any packages you intend to edit:
```Julia
using Revise
using QuantumCollocation
```

### Documentation

Documentation is built using [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and uses [Literate.jl](https://github.com/fredrikekre/Literate.jl) to generate markdown files from scripts stored in *docs/literate*. To build the documentation locally, start Julia with the docs environment:

```bash
julia --project=docs
```

Then (for ease of development) load the following packages:

```julia
using Revise, LiveServer, QuantumCollocation
```

To [live-serve](https://juliadocs.org/LiveServer.jl/dev/lib/public/) the docs, run
```julia
servedocs(literate_dir="docs/literate", skip_dir="docs/src/generated")
```
The extra arguments prevent an infinite loop caused by the generated Literate files. If the `index.md` is also dynamically generated from the `README.md`, run
```julia
servedocs(literate_dir="docs/literate", skip_dir="docs/src/generated", skip_files=["docs/src/index.md"])
```

Changes made to files in the docs directory should be automatically reflected in the live server. To reflect changes in the source code (e.g. doc strings), since we are using Revise, simply kill the live server running in the REPL (with, e.g., Ctrl-C) and restart it with the above command. 

### Writing tests

Tests are implemented using the [`TestItems.jl`](https://www.julia-vscode.org/docs/stable/userguide/testitems/) package. 

```Julia
@testitem "Hadamard gate" begin
    H_drift, H_drives = GATES[:Z], [GATES[:X], GATES[:Y]]
    U_goal = GATES[:H]
    T = 51
    Δt = 0.2

    prob = UnitarySmoothPulseProblem(
        H_drift, H_drives, U_goal, T, Δt,
        ipopt_options=IpoptOptions(print_level=1)
    )

    solve!(prob, max_iter=100)
    @test unitary_rollout_fidelity(prob) > 0.99
end
```

Individual tests will populate in the Testing panel in VSCode. All tests are integrated into the base test system for CI, which occurs at each PR submission.

Tests should be included in the same file as the code they test, so _problem_templates/unitary_smooth_pulse_problem.jl_ contains the test items for `UnitarySmoothPulseProblem`.

### Reporting Issues

Issue templates are available on GitHub. We are happy to take feature requests!
