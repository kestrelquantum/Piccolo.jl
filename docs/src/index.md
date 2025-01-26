# Piccolo.jl

<p align="center">
<img src="assets/piccolo_logo.svg" alt="logo" width="50%"/>
</p>

![piccolo](assets/piccolo_logo.svg)
  
| **Documentation** | **Build Status** | **Support** | **License** |
|:-----------------:|:----------------:|:-----------:|:---------:|
| [![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://kestrelquantum.github.io/QuantumCollocation.jl/dev/) | [![Build Status](https://github.com/kestrelquantum/QuantumCollocation.jl/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/kestrelquantum/QuantumCollocation.jl/actions/workflows/CI.yml?query=branch%3Amain) [![Coverage](https://codecov.io/gh/kestrelquantum/QuantumCollocation.jl/branch/main/graph/badge.svg)](https://codecov.io/gh/kestrelquantum/QuantumCollocation.jl)| [![Unitary Fund](https://img.shields.io/badge/Supported%20By-Unitary%20Fund-FFFF00.svg)](https://unitary.fund) | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
Piccolo.jl is a meta-package for quantum optimal control using the Pade Integrator Collocation (Piccolo) method. This package reexports the following packages

- [QuantumCollocation.jl](https://github.com/kestrelquantum/QuantumCollocation.jl)
- [NamedTrajectories.jl](https://github.com/kestrelquantum/NamedTrajectories.jl)
- [TrajectoryIndexingUtils.jl](https://github.com/kestrelquantum/TrajectoryIndexingUtils.jl)
- [PiccoloQuantumObjects.jl](https:/github.com/kestrelquantum/PiccoloQuantumObjects.jl)
- [PiccoloPlots.jl](https:/github.com/kestrelquantum/PiccoloPlots.jl)

For documentation please see the individual packages.

## Usage

Just run
```julia
using Piccolo
```

## Installation
This package is registered! To install enter the Julia REPL, type `]` to enter pkg mode, activate your environment `activate`, and then run 
```julia
pkg> add Piccolo
```

> *"Technologies are ways of commandeering nature: the sky belongs to those who know how to fly; the sea belongs to those who know how to swim and navigate." &ndash; Simone de Beauvoir*

## Docstrings

```@autodocs
Modules = [Piccolo]
```
