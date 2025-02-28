var documenterSearchIndex = {"docs":
[{"location":"release_notes/#Release-Notes","page":"Release Notes","title":"Release Notes","text":"","category":"section"},{"location":"release_notes/","page":"Release Notes","title":"Release Notes","text":"The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.","category":"page"},{"location":"release_notes/#[v0.3.1]-2024-10-17","page":"Release Notes","title":"[v0.3.1] - 2024-10-17","text":"","category":"section"},{"location":"release_notes/#Fixed","page":"Release Notes","title":"Fixed","text":"","category":"section"},{"location":"release_notes/","page":"Release Notes","title":"Release Notes","text":"Fixed and added tests to RydbergChainSystem","category":"page"},{"location":"release_notes/#[v0.3.0]-2024-10-10","page":"Release Notes","title":"[v0.3.0] - 2024-10-10","text":"","category":"section"},{"location":"release_notes/#Added","page":"Release Notes","title":"Added","text":"","category":"section"},{"location":"release_notes/","page":"Release Notes","title":"Release Notes","text":"PiccoloOptions to handle custome problem settings.","category":"page"},{"location":"release_notes/#Changed","page":"Release Notes","title":"Changed","text":"","category":"section"},{"location":"release_notes/","page":"Release Notes","title":"Release Notes","text":"Refactored trajectory initialization functions\nImproved documentation\nTypo fixes","category":"page"},{"location":"release_notes/#[v0.2.0]-2024-02-22","page":"Release Notes","title":"[v0.2.0] - 2024-02-22","text":"","category":"section"},{"location":"release_notes/#Added-2","page":"Release Notes","title":"Added","text":"","category":"section"},{"location":"release_notes/","page":"Release Notes","title":"Release Notes","text":"EmbeddedOperator to handle subspace gate optimization and leakage suppression\nPlotting methods for unitary populations","category":"page"},{"location":"release_notes/#Changed-2","page":"Release Notes","title":"Changed","text":"","category":"section"},{"location":"release_notes/","page":"Release Notes","title":"Release Notes","text":"New quantum systems interface\nTransmon system template\nRestructured the code base for easier quantum system and problem template development","category":"page"},{"location":"release_notes/#Removed","page":"Release Notes","title":"Removed","text":"","category":"section"},{"location":"release_notes/","page":"Release Notes","title":"Release Notes","text":"Stale examples ","category":"page"},{"location":"release_notes/#Fixed-2","page":"Release Notes","title":"Fixed","text":"","category":"section"},{"location":"release_notes/","page":"Release Notes","title":"Release Notes","text":"Robustness improvements objective test fixes ","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"EditURL = \"../../literate/multilevel_transmon.jl\"","category":"page"},{"location":"generated/multilevel_transmon/#Multilevel-Transmon","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"","category":"section"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"In this example we will look at a multilevel transmon qubit with a Hamiltonian given by","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"hatH(t) = -fracdelta2 hatn(hatn - 1) + u_1(t) (hata + hata^dagger) + u_2(t) i (hata - hata^dagger)","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"where hatn = hata^dagger hata is the number operator, hata is the annihilation operator, delta is the anharmonicity, and u_1(t) and u_2(t) are control fields.","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"We will use the following parameter values:","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"beginaligned\ndelta = 02 text GHz\nabsu_i(t) leq 02 text GHz\nT_0 = 10 text ns\nendaligned","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"For convenience, we have defined the TransmonSystem function in the QuantumSystemTemplates module, which returns a QuantumSystem object for a transmon qubit. We will use this function to define the system.","category":"page"},{"location":"generated/multilevel_transmon/#Setting-up-the-problem","page":"Multilevel Transmon","title":"Setting up the problem","text":"","category":"section"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"To begin, let's load the necessary packages, define the system parameters, and create a a QuantumSystem object using the TransmonSystem function.","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"using Piccolo\nusing SparseArrays\nusing Random;\nRandom.seed!(123);\n\n# define the time parameters\n\nT₀ = 10     # total time in ns\nT = 50      # number of time steps\nΔt = T₀ / T # time step\n\n# define the system parameters\nlevels = 5\nδ = 0.2\n\n# add a bound to the controls\na_bound = 0.2\ndda_bound = 1.0\n\n# create the system\nsys = TransmonSystem(levels = levels, δ = δ)\n\n# let's look at the parameters of the system\nsys.params","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"Since this is a multilevel transmon and we want to implement an, let's say, X gate on the qubit subspace, i.e., the first two levels we can utilize the EmbeddedOperator type to define the target operator.","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"# define the target operator\nop = EmbeddedOperator(:X, sys)\n\n# show the full operator\nop.operator |> sparse","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"We can then pass this embedded operator to the UnitarySmoothPulseProblem template to create","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"# create the problem\nprob = UnitarySmoothPulseProblem(sys, op, T, Δt; a_bound = a_bound, dda_bound = dda_bound)\n\n# solve the problem\nsolve!(prob; max_iter = 50)","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"Let's look at the fidelity in the subspace","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"println(\n    \"Fidelity: \",\n    unitary_rollout_fidelity(prob.trajectory, sys; subspace = op.subspace),\n)","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"and plot the result using the plot_unitary_populations function.","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"plot_unitary_populations(prob.trajectory)","category":"page"},{"location":"generated/multilevel_transmon/#Leakage-suppresion","page":"Multilevel Transmon","title":"Leakage suppresion","text":"","category":"section"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"As can be seen from the above plot, there is a substantial amount of leakage into the higher levels during the evolution. To mitigate this, we have implemented the ability to add a cost to populating the leakage levels, in particular this is an L_1 norm cost, which is implemented via slack variables and should ideally drive those leakage populations down to zero. To implement this, pass leakage_suppresion=true and R_leakage={value} to the UnitarySmoothPulseProblem template.","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"# create the a leakage suppression problem, initializing with the previous solution\n\nprob_leakage = UnitarySmoothPulseProblem(\n    sys,\n    op,\n    T,\n    Δt;\n    a_bound = a_bound,\n    dda_bound = dda_bound,\n    leakage_suppression = true,\n    R_leakage = 1e-1,\n    a_guess = prob.trajectory.a,\n)\n\n# solve the problem\n\nsolve!(prob_leakage; max_iter = 50)","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"Let's look at the fidelity in the subspace","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"println(\n    \"Fidelity: \",\n    unitary_rollout_fidelity(prob_leakage.trajectory, sys; subspace = op.subspace),\n)","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"and plot the result using the plot_unitary_populations function from PiccoloPlots.jl","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"plot_unitary_populations(prob_leakage.trajectory)","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"Here we can see that the leakage populations have been driven substantially down.","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"","category":"page"},{"location":"generated/multilevel_transmon/","page":"Multilevel Transmon","title":"Multilevel Transmon","text":"This page was generated using Literate.jl.","category":"page"},{"location":"contribution_guide/#Contribution-Guide","page":"Contribution Guide","title":"Contribution Guide","text":"","category":"section"},{"location":"contribution_guide/#Introduction","page":"Contribution Guide","title":"Introduction","text":"","category":"section"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"We welcome contributiuons to Piccolo.jl! This document outlines the guidelines for contributing to the project. If you know what you want to see, but are unsure of the best way to achieve it, add an issue on the relevant repository (like QuantumCollocation.jl) and start a discussion with the community! ","category":"page"},{"location":"contribution_guide/#Tips-for-Visual-Studio-Code","page":"Contribution Guide","title":"Tips for Visual Studio Code","text":"","category":"section"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Julia extension You can run Julia notebooks and much more with the Julia extension. Upon opening your project folder in VS code and attempting to run an .ipynb, you will see that VS Code finds the interpreters managed by juliaup and defaults to using the environment based on the Project.toml in the project directory.","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Fonts VS Code will not display all characters allowed by Julia. You can change the editor font family in the settings to 'JuliaMono' to get full support. If you don't want to mix and mash, you can create a new VS Code settings profile for working in Julia at File>Preferences>Profile.","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Tests Tests should automatically populate in VS Code when working with a Piccolo package. For example, just by adding the QuantumCollocation.jl folder to your workspace, you should see tests appear if you click on the Testing sidebar icon. If you run one of these tests, a new Julia kernel is spawned for the test. You can find the kernel if you click on the Julia sidebar icon (after installing the Julia extensions). Sometimes, for the tests to recognize new changes, you may need to manually kill this kernel to see your changes reflected.","category":"page"},{"location":"contribution_guide/#Developing","page":"Contribution Guide","title":"Developing","text":"","category":"section"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Install Julia Juliaup is an installer and version manager. This is one useful way to manage Julia versions and keep up with the latest changes. After installing, run julia to obtain the Julia REPL.","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Julia environments (Documentation) Your project's environment is stored in Project.toml. You can interactively add packages to an environment by using the Julia command line REPL and package manager.  Start Julia in the project folder. Type ] to enter the package manager. Type activate . to activate or create an environment specified by Project.toml located in the current folder. Separately, you generate a manifest (solving the versions to create a valid environment) by running instantiate; instantiate will check that the environment is correct after you add all the packages you want.","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Adding packages (Documentation) The initial cell for a Piccolo notebook might look something like the following:","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"# Standard packages\nusing LinearAlgebra\nusing CairoMakie\n\n# Piccolo\nusing Piccolo","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"First off are the standard packages (these are like Numpy and Matplotlib). Open the package manager in the current environment (type julia, ], and activate .), type add LinearAlgebra to install and precompile LinearAlgebra. Same with CairoMakie. Second, let's install Piccolo. We do add Piccolo to get the entire ecosystem as a bundle from the Julia repository.","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Sometimes you will want to develop individual Piccolo packages, so our header might look like","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"# Standard packages\nusing LinearAlgebra\nusing CairoMakie\n\n# Piccolo packages\nusing QuantumCollocation\nusing NamedTrajectories","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"These are two packages (QuantumCollocation, NamedTrajetories) inside Piccolo. ","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"As a developer, we want to use the git repositories directly from the harmoniqs Quantum Github page. Clone, then add the local packages to the Project file with e.g. dev ../relative/path/to/repo/QuantumCollocation. This command installs the development version of QuantumCollocation pointing to the local Github code instead of the package repository. You can repeat this for the others, also.","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Revise Revise.jl will let you edit source code, update packages, and reload the changes in a notebook–-automatically! This is a great tool for development. add Revise from the REPL and then include it before any packages you intend to edit:","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"using Revise\nusing QuantumCollocation","category":"page"},{"location":"contribution_guide/#Documentation","page":"Contribution Guide","title":"Documentation","text":"","category":"section"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Documentation is built using Documenter.jl and uses Literate.jl to generate markdown files from scripts stored in docs/literate. To build the documentation locally, start Julia with the docs environment:","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"julia --project=docs","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Then (for ease of development) load the following packages:","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"using Revise, LiveServer, QuantumCollocation","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"To live-serve the docs, run","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"servedocs(literate_dir=\"docs/literate\", skip_dir=\"docs/src/generated\")","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"The extra arguments prevent an infinite loop caused by the generated Literate files. If the index.md is also dynamically generated from the README.md, run","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"servedocs(literate_dir=\"docs/literate\", skip_dir=\"docs/src/generated\", skip_files=[\"docs/src/index.md\"])","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Changes made to files in the docs directory should be automatically reflected in the live server. To reflect changes in the source code (e.g. doc strings), since we are using Revise, simply kill the live server running in the REPL (with, e.g., Ctrl-C) and restart it with the above command. ","category":"page"},{"location":"contribution_guide/#Writing-tests","page":"Contribution Guide","title":"Writing tests","text":"","category":"section"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Tests are implemented using the TestItems.jl package. ","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"@testitem \"Hadamard gate\" begin\n    H_drift, H_drives = GATES[:Z], [GATES[:X], GATES[:Y]]\n    U_goal = GATES[:H]\n    T = 51\n    Δt = 0.2\n\n    prob = UnitarySmoothPulseProblem(\n        H_drift, H_drives, U_goal, T, Δt,\n        ipopt_options=IpoptOptions(print_level=1)\n    )\n\n    solve!(prob, max_iter=100)\n    @test unitary_rollout_fidelity(prob) > 0.99\nend","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Individual tests will populate in the Testing panel in VSCode. All tests are integrated into the base test system for CI, which occurs at each PR submission.","category":"page"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Tests should be included in the same file as the code they test, so problemtemplates/unitarysmoothpulseproblem.jl contains the test items for UnitarySmoothPulseProblem.","category":"page"},{"location":"contribution_guide/#Reporting-Issues","page":"Contribution Guide","title":"Reporting Issues","text":"","category":"section"},{"location":"contribution_guide/","page":"Contribution Guide","title":"Contribution Guide","text":"Issue templates are available on GitHub. We are happy to take feature requests!","category":"page"},{"location":"lib/#Library","page":"-","title":"Library","text":"","category":"section"},{"location":"lib/","page":"-","title":"-","text":"Modules = [Piccolo]","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"EditURL = \"../../literate/quickstart.jl\"","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"pretty_print(X::AbstractMatrix) = Base.show(stdout, \"text/plain\", X); # Helper function\nnothing #hide","category":"page"},{"location":"generated/quickstart/#Quickstart-Guide","page":"Quickstart","title":"Quickstart Guide","text":"","category":"section"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"To set up and solve a quantum optimal control problems we provide high level problem templates to quickly get started. For unitary gate problems, where we want to realize a gate U_textgoal, with a system Hamiltonian of the form,","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"H(t) = H_0 + sum_i a^i(t) H_i","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"there is the UnitarySmoothPulseProblem constructor which only requires","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"the drift Hamiltonian, H_0\nthe drive Hamiltonians, qtyH_i\nthe target unitary, U_textgoal\nthe number of timesteps, T\nthe (initial) time step size, Delta t","category":"page"},{"location":"generated/quickstart/#Smooth-Pulse-Problems","page":"Quickstart","title":"Smooth Pulse Problems","text":"","category":"section"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"For example, to create a problem for a single qubit X gate (with a bound on the drive of a^i  a_textbound), i.e., with system hamiltonian","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"H(t) = fracomega2 sigma_z + a^1(t) sigma_x + a^2(t) sigma_y","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"we can do the following:","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"using Piccolo\n\n# set time parameters\nT = 50\nΔt = 0.2\n\n# define drift and drive Hamiltonians\nH_drift = 0.2 * PAULIS.Z\nH_drives = [PAULIS.X, PAULIS.Y]\n\n# create a QuantumSystem from the Hamiltonians\nsystem = QuantumSystem(H_drift, H_drives)\n\n# define target unitary\nU_goal = GATES.X\n\n# set bounds on the drive\na_bound = 0.2\ndda_bound = 0.1\n\n# build the problem\nprob = UnitarySmoothPulseProblem(\n    system,\n    U_goal,\n    T,\n    Δt;\n    a_bound = a_bound,\n    dda_bound = dda_bound,\n)\n\n# solve the problem\nsolve!(prob; max_iter = 50)","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"The above output comes from the Ipopt.jl solver. The problem's trajectory has been updated with the solution. We can see the final control amplitudes and the final unitary by accessing the a and Ũ⃗ fields of the trajectory.","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"size(prob.trajectory.a) |> println\nsize(prob.trajectory.Ũ⃗) |> println","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"The Ũ⃗ field is a vectorized representation of the unitary, which we can convert back to a matrix using the iso_vec_to_operator function exported by PiccoloQuantumObjects.jl.","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"iso_vec_to_operator(prob.trajectory.Ũ⃗[:, end]) |> pretty_print","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"To see the final fidelity we can use the unitary_rollout_fidelity function exported by QuantumCollocation.jl.","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"println(\"Final fidelity: \", unitary_rollout_fidelity(prob.trajectory, system))","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"We can also easily plot the solutions using the plot function exported by NamedTrajectories.jl.","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"plot(prob.trajectory, [:Ũ⃗, :a])","category":"page"},{"location":"generated/quickstart/#Minimum-Time-Problems","page":"Quickstart","title":"Minimum Time Problems","text":"","category":"section"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"We can also easily set up and solve a minimum time problem, where we enforce a constraint on the final fidelity:","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"mathcalF(U_T U_textgoal) geq mathcalF_textmin","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"Using the problem we just solved we can do the following:","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"# final fidelity constraint\nfinal_fidelity = 0.99\n\nmin_time_prob = UnitaryMinimumTimeProblem(prob, system; final_fidelity = final_fidelity)\n\nsolve!(min_time_prob; max_iter = 50)","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"We can see that the final fidelity is indeed greater than the minimum fidelity we set.","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"println(\"Final fidelity:    \", unitary_rollout_fidelity(min_time_prob.trajectory, system))","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"and that the duration of the pulse has decreased.","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"initial_duration = get_times(prob.trajectory)[end]\nmin_time_duration = get_times(min_time_prob.trajectory)[end]\n\nprintln(\"Initial duration:  \", initial_duration)\nprintln(\"Minimum duration:  \", min_time_duration)\nprintln(\"Duration decrease: \", initial_duration - min_time_duration)\n\n# We can also plot the solutions for the minimum time problem, and see that the control amplitudes saturate the bound.\nplot(min_time_prob.trajectory, [:Ũ⃗, :a])","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"","category":"page"},{"location":"generated/quickstart/","page":"Quickstart","title":"Quickstart","text":"This page was generated using Literate.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"<div align=\"center\">\n  <a href=\"https://github.com/harmoniqs/Piccolo.jl\">\n    <img src=\"assets/piccolo_logo.svg\" alt=\"Piccolo.jl\" width=\"25%\"/>\n  </a> \n</div>\n\n<div align=\"center\">\n  <table>\n    <tr>\n      <td align=\"center\">\n        <b>Documentation</b>\n        <br>\n        <a href=\"https://harmoniqs.github.io/Piccolo.jl/stable/\">\n          <img src=\"https://img.shields.io/badge/docs-stable-blue.svg\" alt=\"Stable\"/>\n        </a>\n        <a href=\"https://harmoniqs.github.io/Piccolo.jl/dev/\">\n          <img src=\"https://img.shields.io/badge/docs-dev-blue.svg\" alt=\"Dev\"/>\n        </a>\n      </td>\n      <td align=\"center\">\n        <b>Build Status</b>\n        <br>\n        <a href=\"https://github.com/harmoniqs/Piccolo.jl/actions/workflows/CI.yml?query=branch%3Amain\">\n          <img src=\"https://github.com/harmoniqs/Piccolo.jl/actions/workflows/CI.yml/badge.svg?branch=main\" alt=\"Build Status\"/>\n        </a>\n        <a href=\"https://codecov.io/gh/harmoniqs/Piccolo.jl\">\n          <img src=\"https://codecov.io/gh/harmoniqs/Piccolo.jl/branch/main/graph/badge.svg\" alt=\"Coverage\"/>\n        </a>\n      </td>\n      <td align=\"center\">\n        <b>License</b>\n        <br>\n        <a href=\"https://opensource.org/licenses/MIT\">\n          <img src=\"https://img.shields.io/badge/License-MIT-yellow.svg\" alt=\"MIT License\"/>\n        </a>\n      </td>\n      <td align=\"center\">\n        <b>Support</b>\n        <br>\n        <a href=\"https://unitary.fund\">\n          <img src=\"https://img.shields.io/badge/Supported%20By-Unitary%20Fund-FFFF00.svg\" alt=\"Unitary Fund\"/>\n        </a>\n      </td>\n    </tr>\n  </table>\n</div>","category":"page"},{"location":"#Description","page":"Home","title":"Description","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Piccolo.jl is a meta-package for quantum optimal control using the Pade Integrator Collocation (Piccolo) method. This package reexports the following packages","category":"page"},{"location":"","page":"Home","title":"Home","text":"QuantumCollocation.jl\nNamedTrajectories.jl\nTrajectoryIndexingUtils.jl\nPiccoloQuantumObjects.jl\nPiccoloPlots.jl","category":"page"},{"location":"","page":"Home","title":"Home","text":"For documentation please see the individual packages.","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Just run","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Piccolo","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package is registered! To install enter the Julia REPL, type ] to enter pkg mode, activate your environment activate, and then run ","category":"page"},{"location":"","page":"Home","title":"Home","text":"pkg> add Piccolo","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"\"Technologies are ways of commandeering nature: the sky belongs to those who know how to fly; the sea belongs to those who know how to swim and navigate.\" – Simone de Beauvoir","category":"page"}]
}
