# Piccolo.jl
A convenience meta-package for quantum optimal control using the Pade Integrator COllocation (PICO) method.

## Description

### JuliCon 2033 Talk
To see an overview of the PICO method and a demo of how to use this package, check out our recorded talk at JuliaCon 2023 [here](https://www.youtube.com/watch?v=NBdck6UX0Tc).

### Direct Collocation for Quantum Optimal Control
To see a detailed description of the PICO method, check out our paper [here](https://arxiv.org/abs/2305.03261).  It won 2nd best paper in the QTEM category at IEEE QCE 2023! 


## Usage

Just run
```julia
using Piccolo
```

and this package reexports the following packages

- [QuantumCollocation.jl](https://github.com/aarontrowbridge/QuantumCollocation.jl)
- [NamedTrajectories.jl](https://github.com/aarontrowbridge/NamedTrajectories.jl)
- [TrajectoryIndexingUtils.jl](https://github.com/aarontrowbridge/TrajectoryIndexingUtils.jl)

## Installation
This package is registered! To install just run 
```julia
] add Piccolo
```
in the REPL
