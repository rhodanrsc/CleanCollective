# Contributing

# Linkedin learn course: https://www.linkedin.com/learning/git-essential-training-the-basics/use-git-version-control-software-to-manage-project-code?autoplay=true&u=2245281

### Resetting a branch to the main GitHub

```
cd PATH-TO-WORKSPACE
// Ensure you're on the correct branch
git branch
git checkout BRANCH-YOU-WANT
```

```
git checkout main
git fetch origin main
git reset --hard origin/main
```

Create a new branch based off the origin

```
git checkout -b NEW-BRANCH origin/main
```

### Setup

```
cd PATH-TO-WORKSPACE
git clone "project URL"
cd project-group10
```

### Pushing code

The main branch is protected and everything must be done through pull requests.
First start off with creating a new branch. You're going to have to create a new branch for every addition.

```
cd PATH-TO-WHERE-project-capstone_proj-IS
git checkout -b BRANCH-NAME origin/main
```

Then when you have your code changes complete

```
git add .
git commit -m "Insert Commit Message"
git push origin BRANCH-NAME
```

You can also add your own account if you forked this repository, in that case,
add your own remote and instead of origin, use whatever you called it.

Then after that go to the GitHub project location.
and there should be a automatic header stating would you like to make a pull request.
Click create pull request and fill out the information.
Then we as a team can request changes and ensure that it's good to go.

If the yellow header doesn't appear, you may have pushed to a different branch or remote, or maybe GitHub didn't see.
Go to https://github.com/"project_name"/pulls and create a pull request, and compare the main to whatever branch you just made.
