---
description: Tutorial/Guide outline.
id: technical-writer
sidebar_position: 3
---

# Technical Writer

Add a note that this tutorial/guide is written for macOS.

This tutorial will guide you through setting up a  "Hello World" Java application using Gradle.

This guide consists of two projects, one base `hello world` and a second project using Gradle task and plugins.

Maybe just cover them as one and just link to files, but I fear that adding the change to the build file could introduce user errors

## Prerequisites

- Java Development Kit (JDK) installed (version 8 or later).
- Gradle installed on your system. You can download it from the Gradle website.
- Git

(Add link to official installation docs)

## Step 1: Setting up the Project

### Prepare the Project

Open your terminal or command prompt and clone the GitHub repository:

```shell
git clone https://github.com/svx/gradle-hello-world.git
```

## Step 2: Understanding the Project Structure

Change into the directory.

(Here directory run down)

```shell
├── LICENSE
├── README.md
├── hello-world-project
│   ├── app
│   │   ├── build.gradle.kts
│   │   └── src
│   ├── gradle
│   │   ├── libs.versions.toml
│   │   └── wrapper
│   ├── gradlew
│   ├── gradlew.bat
│   ├── notes.md
│   └── settings.gradle.kts
├── technical-writer-project
│   ├── app
│   │   ├── build
│   │   ├── build.gradle.kts
│   │   └── src
│   ├── gradle
│   │   ├── libs.versions.toml
│   │   └── wrapper
│   ├── gradlew
│   ├── gradlew.bat
│   ├── notes.md
│   └── settings.gradle.kts
└── website
```

Where:

Adjust below to match the actual structure!

- build.gradle: The main build script for your project.
- settings.gradle.kts: Contains project settings, like the project name.
- gradle/wrapper/: Contains the Gradle wrapper files, allowing the project to be built even if Gradle isn't installed globally.
- src/: The source directory for your Java code and tests.

### Initialize the Project

Check if that is needed per project

Use the `gradle init` command to generate a new Gradle project:

```shell
gradle init --type java-application  --dsl kotlin
```

Explain and link to the *init* docs to add more info.

## Gradle Wrapper

The Gradle Wrapper allows a Gradle project to specify which version of Gradle should be used to build the project, ensuring consistency and reliability across different environments and team members.
This means that anyone cloning the repository can build the project without needing to have Gradle pre-installed, as the Wrapper will download and use the correct Gradle version automatically.

Key Benefits of the Gradle Wrapper

- Consistency: Ensures that the project uses the same Gradle version across all environments.
- Ease of Use: No need to install Gradle manually. The Wrapper handles downloading and setting up the specified version.
- Portability: Simplifies CI/CD pipelines and onboarding new developers, as they only need to have Java installed.

Add a link to the docs for more info.

## Step 4: Building and Running the First Project

In your terminal, change into the first project and run the following command to build the project by using the Gradle Wrapper included into this project.

```shell
cd hello-world-project
./gradlew build
```

Explain that "build: is a task, explain that below and add a link to below

Add output example, maybe in a tab.

### 2. Run the Application

To run the application, use the following command:

```shell
./gradlew run
```

You should see the output:

```shell
> Task :run
Hello, World!
```

Congratulations you build and run your first application

Add info where the use can find the whole application and how to share it.

## Customizing the Build File

In the second part of this guide/tutorial, you will learn about Gradle tasks and plugins.

## Gradle Tasks

(Add link to docs for more info)

A Gradle task is a single piece of work that a build performs, such as compiling code, running tests, creating JAR files, or deploying applications.
Each task has a name and a set of actions, which are blocks of code that execute when the task runs.
Key Concepts of Gradle Tasks

- Definition:
    Tasks can be defined in the *build.gradle file*. They can be basic or complex, depending on the actions they need to perform.

- Execution:
    You can run tasks from the command line using `./gradlew <taskName>`. Gradle determines the order of task execution based on their dependencies.

- Task Dependencies:
    Tasks can depend on other tasks, ensuring that dependent tasks are executed in the correct order. This is useful for tasks that need to perform preliminary steps before the main action.

## Gradle Extensions

(Add link to docs for more info)

Gradle extensions are a powerful feature that allows you to add extra properties and methods to your Gradle project.
They provide a way to customize and extend the functionality of Gradle plugins and build scripts.
Extensions are often used to configure plugins in a more expressive and organized manner.

Key Concepts of Gradle Extensions

- Definition:
    Extensions are objects that are added to the project and can be configured in the build script. They provide a domain-specific language (DSL) for configuring plugins and other project settings.

- Access:
    Extensions can be accessed in the build script via the *project.extensions* property or by their specific names if they are registered with a name.

- Customization:
    Extensions allow you to expose custom configuration blocks, making it easier to manage complex configurations.

Explain the differences, maybe use an IDE screen or a code screen showing the differences

Open the *gradle.build.kts* and compare it to the build file of the first project

A SCREEN WITH THE Difference

Explanation:

Check below to make sure that is valid!

- plugins: Adds the 'application' plugin which provides tasks for running the application.
- repositories: Specifies where to find dependencies (Maven Central Repository in this case).
- dependencies: Specifies the dependencies needed for the project (JUnit for testing here).
- application: Configures the main class for the application.

### Building the Second Application

(Maybe rename this project and use a better name)

(maybe use better headings here)

In your terminal, change into the second project and run the following command to build the project:

```shell
cd technical-writer-project
./gradlew build
```

### Task Overview

In your terminal:

```shell
./gradlew tasks
```

This will show a list of all possible tasks, as mentioned in the first part, `build` is a task.

Add SCREEN

### Running a Task

In your terminal:

```shell
./gradlew hello
```

This will run the **hello** task, it will create two files (Check that and add screen0 which contain "Hello Word".

## Conclusion

Adjust below

Congratulations! You've successfully created a  "Hello World" application using Gradle. You've learned how to set up a Gradle project, customize the *build.gradle* file, add dependencies, and run your application.
Gradle is a powerful tool with many features for managing and automating your builds, so continue exploring its capabilities to make the most of it.
