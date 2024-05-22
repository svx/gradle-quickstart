---
description: Tutorial/Guide outline.
id: fundamentals
sidebar_position: 2
---

import ContentRef from '@site/src/components/ContentRef'

# Fundamentals

:::warning
Add an intro
:::

## Gradle Wrapper

The Gradle Wrapper allows a Gradle project to specify which version of Gradle should be used to build the project, ensuring consistency and reliability across different environments and team members.<br />
This means that anyone cloning the repository can build the project without needing to have Gradle pre-installed, as the Wrapper will download and use the correct Gradle version automatically.

Key Benefits of the Gradle Wrapper

- **Consistency:** Ensures that the project uses the same Gradle version across all environments.
- **Ease of Use:** No need to install Gradle manually. The Wrapper handles downloading and setting up the specified version.
- **Portability:** Simplifies CI/CD pipelines and onboarding new developers, as they only need to have Java installed.

Structure of the Gradle Wrapper

When you generate the Gradle Wrapper, several files are added to your project:

- **gradlew:** A shell script for Unix-based systems to run the Wrapper.
- **gradlew.bat:** A batch script for Windows to run the Wrapper.
- **gradle/wrapper/gradle-wrapper.jar:** A JAR file containing the Wrapper's code.
- **gradle/wrapper/gradle-wrapper.properties:** A properties file specifying the Gradle version and distribution URL.

:::info Batteries included
All [tutorials](./category/tutorials/ "Link to the tutorial overview page") projects are already configured to use a Wrapper, you do not have to generate one.
:::

<ContentRef url="https://docs.gradle.org/current/userguide/gradle_wrapper.html">Learn more about the Gradle Wrapper</ContentRef>

## Gradle Tasks

<!-- vale off -->

A Gradle task is a single piece of work that a build performs, such as compiling code, running tests, creating JAR files, or deploying applications.
Each task has a name and a set of actions, which are blocks of code that execute when the task runs.

<!-- vale on -->

<h3>Key Concepts of Gradle Tasks</h3>

- **Definition:** Tasks can be defined in the *build.gradle* file. They can be basic or complex, depending on the actions they need to perform.

- **Execution:** You can run tasks from the command line using `./gradlew <taskName>`. Gradle determines the order of task execution based on their dependencies.

- **Task Dependencies:** Tasks can depend on other tasks, ensuring that dependent tasks are executed in the correct order. This is useful for tasks that need to perform preliminary steps before the main action.

### Task Overview

To get an overview about all available tasks for a project, run `./gradlew tasks` in your project directory.

See the following example:

![Task Overview Example](/img/gradle-tasks-example.png)

<ContentRef url="https://docs.gradle.org/current/userguide/tutorial_using_tasks.html">Learn more about using Gradle Tasks</ContentRef>

### Running a Task

To run a task, invoke `./gradlew <taskName>` from the command line.

The following example runs a task named *hello*.

```shell
 ./gradlew hello

BUILD SUCCESSFUL in 675ms
1 actionable task: 1 up-to-date
```

![Hello Task Example](/img/gradle-hello-task.png)

:::warning
What is better UI/DX the code example or the picture?
:::

## Gradle Plugins

Gradle plugins are extensions to the Gradle build system that provide additional functionality to manage and automate tasks within a build.
Plugins can add new tasks, enhance existing tasks, and configure project settings in a consistent and reusable manner.<br />
Gradle plugins can be applied to projects to handle various aspects of the build lifecycle, such as compiling code, running tests, packaging applications, and more.

<h3>Types of Gradle Plugins</h3>

- **Core Plugins:** These are built into Gradle and cover common tasks like compiling Java code (java plugin), building Android apps (com.android.application plugin), etc.

- **Community Plugins:** These are developed by the community and can be found in repositories like the Gradle Plugin Portal. Examples include plugins for Docker, code quality tools, and more.

- **Custom Plugins:** These are developed by users to address specific needs of their projects.

<ContentRef url="https://docs.gradle.org/current/userguide/custom_plugins.html">Learn more about using Gradle Plugins</ContentRef>
