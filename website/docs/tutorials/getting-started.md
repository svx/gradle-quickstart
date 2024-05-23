---
description: Tutorial/Guide outline.
id: getting-started
sidebar_position: 1
sidebar_label: Getting started
sidebar_class_name: green
tags:
  - Tutorial
  - Beginner
---

import ContentRef from '@site/src/components/ContentRef'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started

This tutorial will guide you through setting up a  "Hello World" Java application using Gradle.

In this tutorial, you will:

- Clone an example project from GitHub.
- Initialize a new Gradle project.
- Build the project.
- Learn about Gradle’s project structure.
- Explore Gradle files and build scripts.

:::warning
Add a bit more info.

Adjust above
:::

:::info
In this tutorial, all examples are macOS based.
:::

## Prerequisites

- [Java Development Kit (JDK)](https://en.wikipedia.org/wiki/Java_Development_Kit "Link to JDK page on Wikipedia") installed (version 8 or later).
- [Gradle](https://docs.gradle.org/current/userguide/installation.html#installation "Link to Gradle installation docs") installed on your system.
- [Git](https://git-scm.com/ "Link to the website of Git")

## Preparing the Project

1. Open your terminal or command prompt and clone the GitHub repository.

```shell title="CLI"
git clone https://github.com/svx/gradle-hello-world.git
```

2. Navigate to the `hello-world-project` directory.

```shell title="CLI"
cd hello-world-project
```

## Understanding the Project Structure

```shell title="Project Structure Overview"
├── app
│   ├── build.gradle.kts
│   └── src
│       ├── main
│       └── test
├── gradle
│   ├── libs.versions.toml
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
└── settings.gradle.kts
```

- **app/build.gradle.kts:** The main build script for your project.
- **app/src/:** The source directory for your Java code and tests.
- **gradle/wrapper/**: Contains the Gradle wrapper files, allowing the project to be built even if Gradle isn't installed globally.
- **gradlew:** A shell script for Unix-based systems to run the Wrapper.
- **gradlew.bat:** A batch script for Windows to run the Wrapper.
- **settings.gradle.kts:** Contains project settings, like the project name.

## Understanding the Project Files

### Settings file

The settings file in a Gradle project, typically named `settings.gradle` or `settings.gradle.kts` for Kotlin DSL, is used to configure the Gradle build at a high level.<br />
It defines the structure of the multi-project build and can include plugin configurations that need to be applied before any projects are evaluated.

```kotlin showLineNumbers title="settings.gradle.kts"
plugins {
    // Apply the foojay-resolver plugin to allow automatic download of JDKs
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.7.0"
}

rootProject.name = "technical-writer-project"
include("app")
```

<details>
<summary>Breakdown and Explanation</summary>
<p>

#### 1. Plugins Block

```kotlin {1-4} showLineNumbers title="Plugins"
plugins {
    // Apply the foojay-resolver plugin to allow automatic download of JDKs
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.7.0"
}
```

The `plugins` block in the settings file is used to apply plugins that are necessary for configuring the build environment before any project-specific configurations are applied.

- **foojay-resolver Plugin:** The org.gradle.toolchains.foojay-resolver-convention plugin is used to facilitate the automatic download and management of JDKs through Foojay (a community-driven Java version manager).
This plugin ensures that the appropriate JDK version is available for the build, streamlining the setup process.
- **Version:** The version `0.7.0` specifies the exact version of the foojay-resolver plugin to use.

#### 2. Root Project Name

```kotlin {1} showLineNumbers title="Root Project Name"
rootProject.name = "technical-writer-project"
```

The `rootProject.name` property sets the name of the root project.
This is useful for multi-project builds where you have a main project (root project) and potentially several subprojects.

- **Name:** In this case, the root project is named `technical-writer-project`.
This name will be used as the identifier for the main project directory and in build outputs.

#### 3. Include Subprojects

```kotlin {1} showLineNumbers title="Include Subprojects"
include("app")
```

The `include` method is used to specify the subprojects that are part of the build.
Each subproject corresponds to a directory under the root project directory.

- **Subproject `app`:** The settings file includes a subproject named `app`.
This means there should be a directory named app under the root project directory (`technical-writer-project/app`), and this directory will contain its own `build.gradle.kts` file for specific build configurations.

</p>
</details>

### Build File

The Gradle build file, typically named `build.gradle` or `build.gradle.kts` for Kotlin DSL, defines how the project is built.
It specifies plugins, dependencies, repositories, and custom tasks.

```kotlin showLineNumbers title="build.gradle.kts"
plugins {
    // Apply the application plugin to add support for building a CLI application in Java.
    application
}

repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}

dependencies {
    // Use JUnit Jupiter for testing.
    testImplementation(libs.junit.jupiter)

    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    // This dependency is used by the application.
    implementation(libs.guava)
}

// Apply a specific Java toolchain to ease working on different environments.
java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(11))
    }
}

application {
    // Define the main class for the application.
    mainClass.set("hello.world.project.App")
}

tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
}
```

<details>
<summary>Breakdown and Explanation</summary>
<p>

#### 1. Plugins Block

```kotlin {1-4} showLineNumbers title="Plugins"
plugins {
    // Apply the application plugin to add support for building a CLI application in Java.
    application
}
```

The `plugins` block is used to apply plugins to the project.

- **Application Plugin:** The `application` plugin adds tasks for building and running a Java command-line application.
It simplifies packaging and running the application by providing a convenient way to define the main class and build the executable.

#### 2. Repositories Block

```kotlin {1-4} showLineNumbers title="Repository"
repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}
```

The `repositories` block specifies where Gradle should look for dependencies.

- **Maven Central:** The `mavenCentral()` method adds the Maven Central repository, which is a widely used repository for open-source libraries.

#### 3. Dependencies Block

```kotlin {1-9} showLineNumbers title="Dependencies"
dependencies {
    // Use JUnit Jupiter for testing.
    testImplementation(libs.junit.jupiter)

    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    // This dependency is used by the application.
    implementation(libs.guava)
}
```

The `dependencies` block defines the external libraries that the project depends on.

- **JUnit Jupiter:** The `testImplementation(libs.junit.jupiter)` line adds JUnit Jupiter (the new version of JUnit) as a dependency for writing and running tests.
`libs` is a reference to a version catalog, which centralizes dependency versions.
- **JUnit Platform Launcher:** The `testRuntimeOnly("org.junit.platform:junit-platform-launcher")` line adds the JUnit Platform Launcher as a runtime dependency for running tests.
- **Guava:** The `implementation(libs.guava)` line adds Google Guava as a dependency used by the application.
`implementation` means this dependency is required at both compile and runtime.

#### 4. Java Toolchain Block

```kotlin {1-6} showLineNumbers title="Java Toolchain"
// Apply a specific Java toolchain to ease working on different environments.
java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(11))
    }
}
```

The `java` block configures the Java toolchain to ensure a consistent Java version across different development environments.

- **Java Version 11:** The `languageVersion.set(JavaLanguageVersion.of(11))` line specifies that Java 11 should be used for compiling and running the project.
This helps in managing projects that need to be built with a specific Java version, regardless of the JDK installed on the developer's machine.

#### 5. Application Block

```kotlin {1-4} showLineNumbers title="Application"
application {
    // Define the main class for the application.
    mainClass.set("hello.world.project.App")
}
```

The `application` block configures the application plugin.

- **Main Class:** The `mainClass.set("hello.world.project.App")` line defines the entry point of the application.
When the application is run, the specified class (`hello.world.project.App`) will be used as the main class.

#### 6. Custom Test Task Configuration

```kotlin {1-4} showLineNumbers title="Test Task Configuration"
tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
}
```

This block customizes the behavior of the `test` task.

- **JUnit Platform:** The `useJUnitPlatform()` method configures the `test` task to use the [JUnit](https://junit.org/junit5/ "Link to the website of JUnit") Platform for discovering and running tests.
This is necessary for running JUnit Jupiter tests.

</p>
</details>

## Initializing the Project

:::warning
Add tab with output
:::

Use `gradle init` to generate a new Gradle project using the [Gradle Kotlin DSL](https://docs.gradle.org/current/dsl/ "Link to the Gradle Build Language Reference") (Domain Specific Language) a Kotlin-based language:

```shell title="CLI"
gradle init --type java-application --dsl kotlin
```

<ContentRef url="https://docs.gradle.org/current/userguide/build_init_plugin.html">Learn more about the Build Init Plugin</ContentRef>

## Building the Project

Use the `./gradlew build` command to build the project using [Gradle Wrapper](../fundamentals.md#gradle-wrapper "Link to documentation about the Gradle Wrapper").

<Tabs>
<TabItem value="Command">

```shell title="CLI"
./gradlew build
```

</TabItem>
<TabItem value="Output">

```shell title="Result"
BUILD SUCCESSFUL in 372ms
7 actionable tasks: 7 up-to-date
```

</TabItem>
</Tabs>

## Running the Application

To run the application, use the following command:

<Tabs>
<TabItem value="Command">

```shell title="CLI"
./gradlew run
```

</TabItem>
<TabItem value="Output">

```shell title="Result"
> Task :app:run
Hello World!

BUILD SUCCESSFUL in 373ms
2 actionable tasks: 1 executed, 1 up-to-date
```

</TabItem>
</Tabs>

:::warning
Add info where the use can find the whole application and how to share it.
:::

## Conclusion

Adjust below

Congratulations! You've successfully created a  "Hello World" application using Gradle.
You will learn the basics about the project root directory setup, build and settings files.

