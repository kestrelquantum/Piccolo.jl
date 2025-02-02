# # Multilevel Transmon

# In this example we will look at a multilevel transmon qubit with a Hamiltonian given by
#
# ```math
# \hat{H}(t) = -\frac{\delta}{2} \hat{n}(\hat{n} - 1) + u_1(t) (\hat{a} + \hat{a}^\dagger) + u_2(t) i (\hat{a} - \hat{a}^\dagger)
# ```
# where $\hat{n} = \hat{a}^\dagger \hat{a}$ is the number operator, $\hat{a}$ is the annihilation operator, $\delta$ is the anharmonicity, and $u_1(t)$ and $u_2(t)$ are control fields.
#
# We will use the following parameter values:
#
# ```math
# \begin{aligned}
# \delta &= 0.2 \text{ GHz}\\
# \abs{u_i(t)} &\leq 0.2 \text{ GHz}\\
# T_0 &= 10 \text{ ns}\\
# \end{aligned}
# ```
#
# For convenience, we have defined the `TransmonSystem` function in the `QuantumSystemTemplates` module, which returns a `QuantumSystem` object for a transmon qubit. We will use this function to define the system.

# ## Setting up the problem

# To begin, let's load the necessary packages, define the system parameters, and create a a `QuantumSystem` object using the `TransmonSystem` function.

using Piccolo
using SparseArrays
using Random;
Random.seed!(123);

## define the time parameters

T₀ = 10     # total time in ns
T = 50      # number of time steps
Δt = T₀ / T # time step

## define the system parameters
levels = 5
δ = 0.2

## add a bound to the controls
a_bound = 0.2
dda_bound = 1.0

## create the system
sys = TransmonSystem(levels = levels, δ = δ)

## let's look at the parameters of the system
sys.params


# Since this is a multilevel transmon and we want to implement an, let's say, $X$ gate on the qubit subspace, i.e., the first two levels we can utilize the `EmbeddedOperator` type to define the target operator.

## define the target operator
op = EmbeddedOperator(:X, sys)

## show the full operator
op.operator |> sparse

# We can then pass this embedded operator to the `UnitarySmoothPulseProblem` template to create

## create the problem
prob = UnitarySmoothPulseProblem(sys, op, T, Δt; a_bound = a_bound, dda_bound = dda_bound)

## solve the problem
solve!(prob; max_iter = 50)

# Let's look at the fidelity in the subspace

println(
    "Fidelity: ",
    unitary_rollout_fidelity(prob.trajectory, sys; subspace = op.subspace),
)

# and plot the result using the `plot_unitary_populations` function.

plot_unitary_populations(prob.trajectory)

# ## Leakage suppresion
# As can be seen from the above plot, there is a substantial amount of leakage into the higher levels during the evolution. To mitigate this, we have implemented the ability to add a cost to populating the leakage levels, in particular this is an $L_1$ norm cost, which is implemented via slack variables and should ideally drive those leakage populations down to zero.
# To implement this, pass `leakage_suppresion=true` and `R_leakage={value}` to the `UnitarySmoothPulseProblem` template.

## create the a leakage suppression problem, initializing with the previous solution

prob_leakage = UnitarySmoothPulseProblem(
    sys,
    op,
    T,
    Δt;
    a_bound = a_bound,
    dda_bound = dda_bound,
    leakage_suppression = true,
    R_leakage = 1e-1,
    a_guess = prob.trajectory.a,
)

## solve the problem

solve!(prob_leakage; max_iter = 50)

# Let's look at the fidelity in the subspace

println(
    "Fidelity: ",
    unitary_rollout_fidelity(prob_leakage.trajectory, sys; subspace = op.subspace),
)

# and plot the result using the `plot_unitary_populations` function from PiccoloPlots.jl

plot_unitary_populations(prob_leakage.trajectory)

# Here we can see that the leakage populations have been driven substantially down.
