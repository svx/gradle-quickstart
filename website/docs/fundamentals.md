---
description: "Gradle Fundamentals"
id: fundamentals
sidebar_position: 2
---

import ContentRef from '@site/src/components/ContentRef'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fundamentals

Understanding the key concepts, you'll be well-equipped to follow the guides and start using Gradle effectively for your projects.

## Settings file

The settings file in a Gradle project, typically named `settings.gradle` or `settings.gradle.kts` for [Kotlin DSL](https://docs.gradle.org/current/userguide/kotlin_dsl.html "Link to the Kotlin DSL docs"),
is used to configure the Gradle build at a high level.<br />
It defines the structure of the multi-project build and can include plugin configurations that need to be applied before any projects are evaluated.

## Build File

The Gradle build file, typically named `build.gradle` or `build.gradle.kts` for Kotlin DSL, defines how the project is built.
It specifies plugins, dependencies, repositories, and custom tasks.

## Gradle Wrapper

The Gradle Wrapper allows a Gradle project to specify which version of Gradle should be used to build the project.<br />

<h3>Key Benefits of the Gradle Wrapper</h3>

- **Consistency:** Ensures that the project uses the same Gradle version across all environments.

- **Ease of Use:** No need to install Gradle manually. The Wrapper handles downloading and setting up the specified version.

- **Portability:** Simplifies CI/CD pipelines and onboarding new developers, as they only need to have Java installed.

Use `gradle wrapper` to initialize the Wrapper.

<Tabs>
<TabItem value="Command">

```shell title="CLI"
gradle wrapper
```

</TabItem>
<TabItem value="Output">

```shell title="Output"
BUILD SUCCESSFUL in 500ms
1 actionable task: 1 executed
```

</TabItem>
</Tabs>

<ContentRef url="https://docs.gradle.org/current/userguide/gradle_wrapper.html">Read the official documentation about the Gradle Wrapper</ContentRef>

## Gradle Tasks

<!-- vale off -->

A Gradle task is a single piece of work that a build performs, such as compiling code, running tests, creating JAR files, or deploying applications.
Each task has a name and a set of actions, which are blocks of code that execute when the task runs.

<!-- vale on -->

<h3>Key Concepts of Gradle Tasks</h3>

- **Definition:** Tasks can be defined in the `build.gradle` file. They can be basic or complex, depending on the actions they need to perform.

- **Execution:** You can run tasks from the command line using `./gradlew <taskName>`. Gradle determines the order of task execution based on their dependencies.

- **Task Dependencies:** Tasks can depend on other tasks, ensuring that dependent tasks are executed in the correct order. This is useful for tasks that need to perform preliminary steps before the main action.

### Task Overview

To get an overview about all available tasks for a project, run `./gradlew tasks` in your project directory.

See the following example:

![Task Overview Example](/img/gradle-tasks-example.png)

<ContentRef url="https://docs.gradle.org/current/userguide/tutorial_using_tasks.html">Read the official documentation about Gradle Tasks</ContentRef>

### Running a Task

Use `./gradlew <taskName>` to run a task from the command line.

The following example runs a task named `hello`.

<Tabs>
<TabItem value="Command">

```shell title="CLI"
 ./gradlew hello
 ```

</TabItem>

<TabItem value="Output">

```shell
BUILD SUCCESSFUL in 675ms
1 actionable task: 1 up-to-date
```

</TabItem>
</Tabs>

## Gradle Plugins

Gradle plugins are extensions to the Gradle build system that provide additional functionality to manage and automate tasks within a build.
Plugins can add new tasks, enhance existing tasks, and configure project settings in a consistent and reusable manner.<br />
Gradle plugins can be applied to projects to handle various aspects of the build lifecycle, such as compiling code, running tests, packaging applications, and more.

<h3>Types of Gradle Plugins</h3>

- **Core Plugins:** These are built into Gradle and cover common tasks like compiling Java code (java plugin), building Android apps (com.android.application plugin), etc.

- **Community Plugins:** These are developed by the community and can be found in repositories like the Gradle Plugin Portal. Examples include plugins for Docker, code quality tools, and more.

- **Custom Plugins:** These are developed by users to address specific needs of their projects.

<ContentRef url="https://docs.gradle.org/current/userguide/custom_plugins.html">Read the official documentation about Gradle Plugins</ContentRef>
