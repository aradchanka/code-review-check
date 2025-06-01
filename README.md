# Code Review notes
The code review checklist is based on [the video about code review from Timur Shemsedinov channel](https://youtu.be/EKL6NiIQ6ZU?si=gW3isHNWT5bz1QGP)

Code Review Tasks:
- Improving code quality and finding better solutions
- Increasing the qualifications of developers
- Transferring knowledge and studying colleagues' work for collective code ownership
- Finding the best solutions
- Edge cases

Why we do Code Review:
- A "tired" or "unfocused" eye (loss of fresh perspective)
- What if a developer gets hit by a bus?
- A team is more effective than individual developers

What we look for in Code Review:
- Compliance with the project's structure and architecture
- Compliance with the technical specification
- Is the code readable by colleagues, is the naming clear to everyone
- How to increase the informativeness of the code
- Is it possible to improve algorithm complexity metrics
  - Perhaps it's worth changing data structures
  - Algorithm optimization
  - Other algorithms
- Race conditions (async programming)
- Memory leaks
- Security
- Anti-patterns
- Error handling
- Unnecessary dependencies or their replacement
- Improving the structure and integration of software components
  - Reducing coupling
  - Increasing code cohesion
- Bad habits

What we are not looking for (should be automated in CI):
- Coding standards (except for the first case)
- Style issues
- Identifier naming rules
- Duplicate code
- Test coverage
- Metrics

Process of creating and accepting a Pull Request:
- When do we submit?
- Why? Every PR should have a goal
- Whom do we add?
- How quickly do we process?
- How do we discuss?
- Consensus
- LGTM (Looks Good To Me)

Problems and what to remember:
- Code Review takes time
- It's irritating
- Settling scores
- Trying to prove who is cooler
- Clarity of the request from the initiator
  - Just strange code without any comments or review goals
  - Why am I being asked for a Code Review?
- Additional introductions and comments
- Clarity of feedback from the reviewer
  - We don't write: this is something strange here...
  - Let's not reduce it to formalities
  - We don't write multi-page novels
- What happens when there are many changes in one PR
- What happens when there are few changes in one PR
- Why it's better to plan development first
- Why it's better to make tests in a separate commit
- Start at a high level
- Review it yourself before committing
- Avoid new commits during a PR
- If possible, avoid alternative but unrelated PRs
- Answer questions
