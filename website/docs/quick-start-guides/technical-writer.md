---
description: Tutorial/Guide outline.
id: quick-technical-writer-new
sidebar_position: 3
sidebar_label: Technical Writer
tags:
  - Tutorial
  - Intermediate
---

import ContentRef from '@site/src/components/ContentRef'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning
Update build file

Add command and output tabs to be consistent
::::

# Technical Writer

In this tutorial, you will:

- Clone an example project from GitHub.
- Initialize a new Gradle project.
- Build the project.
- Learn about Gradle’s project structure.
- Explore Gradle files and build scripts.

This tutorial will guide you through setting up a  "Technical Writer" Java application using Gradle.

This build file sets up a Java application project with a custom plugin that generates text files with a specified message, demonstrating how to extend Gradle's functionality through custom plugins and tasks.

You will learn how to create and use custom tasks using a Gradle Plugin to create test files in the build directory (`app/build`) of the application.

:::warning
Enhance above.

Add line tat that this is for imidate audience if you are new check the hello world first.

:::

:::info
In this tutorial, all examples are macOS based.
:::

## Prerequisites

Add aline that the user should check fundamentals to / if not used to Gradle basics.


- [Java Development Kit (JDK)](https://en.wikipedia.org/wiki/Java_Development_Kit "Link to JDK page on Wikipedia") installed (version 8 or later).
- Gradle [installed on your system](https://docs.gradle.org/current/userguide/installation.html#installation "Link to Gradle installation docs").
- [Git](https://git-scm.com/ "Link to the website of Git")

## Preparing the Project

Open your terminal or command prompt and clone the GitHub repository:

```shell
git clone https://github.com/svx/gradle-hello-world.git
```

Change into the *technical-writer-project*:

```shell title="CLI"
cd technical-writer-project
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

:::warning
Explain the files below.
:::

### Settings file

The settings file in a Gradle project, typically named `settings.gradle` or `settings.gradle.kts` for Kotlin DSL, is used to configure the Gradle build at a high level.<br />
It usually defines the structure of the multi-project build and can include plugin configurations that need to be applied before any projects are evaluated.

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

```kotlin showLineNumbers title="build.gradle.kts"
// Apply the custom Plugin which is defined in the class GreetingPlugin below.
apply<GreetingPlugin>()

// function to create the files a.txt and b.txt in the build directory.
fun buildFile(path: String) = layout.buildDirectory.file(path)

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
    mainClass.set("technical.writer.project.App")
}

tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
}

// Create the files a.txt and b.txt containing the message "Hi from Gradle" in the build directory.
configure<GreetingPluginExtension> {

    message.set("Hi from Gradle")
    outputFiles.from(
        buildFile("a.txt"),
        buildFile("b.txt"))
}

// Custom Plugin
class GreetingPlugin : Plugin<Project> {

    override fun apply(project: Project): Unit = project.run {

        // Add the 'greeting' extension object
        val greeting = extensions.create(
            "greeting",
            GreetingPluginExtension::class,
            project)

        // Add a task that uses the configuration
        tasks {
            register("hello", Greeting::class) {
                group = "Greeting"
                description = "Generates greeting files."
                message.set(greeting.message)
                outputFiles.setFrom(greeting.outputFiles)
            }
        }
    }
}

// Open for extension
open class GreetingPluginExtension(project: Project) {

    val message = project.objects.property<String>()

    val outputFiles: ConfigurableFileCollection = project.files()
}

// Define custom task and task action.
open class Greeting : DefaultTask() {

    @get:Input
    val message = project.objects.property<String>()

    @get:OutputFiles
    val outputFiles: ConfigurableFileCollection = project.files()

    @TaskAction
    fun printMessage() {
        val message = message.get()
        val outputFiles = outputFiles.files
        logger.info("Writing message '$message' to files $outputFiles")
        outputFiles.forEach { it.writeText(message) }
    }
}
```

<details>
<summary>Breakdown and Explanation</summary>
<p>

#### 1. Applying the Custom Plugin

```kotlin {1-2} showLineNumbers title="Applying the Custom Plugin"
// Apply the custom Plugin which is defined in the class GreetingPlugin below.
apply<GreetingPlugin>()
```

This line applies a custom plugin defined within the build file itself.
The plugin class `GreetingPlugin` is defined later in the file.

#### 2. Helper Function

```kotlin {1-2} showLineNumbers title="Helper Function"
// Function to create the files a.txt and b.txt in the build directory.
fun buildFile(path: String) = layout.buildDirectory.file(path)
```

This function generates file paths within the build directory. It will be used to specify the output files for the custom task.

#### 3. Plugins Block

```kotlin {1-4} showLineNumbers title="Plugins"
plugins {
    // Apply the application plugin to add support for building a CLI application in Java.
    application
}
```

The `plugins` block is used to apply plugins to the project.

- **Application Plugin:** The `application` plugin adds tasks for building and running a Java command-line application.
It simplifies packaging and running the application by providing a convenient way to define the main class and build the executable.

#### 4. Repositories Block

```kotlin {1-4} showLineNumbers title="Repository"
repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}
```

The `repositories` block specifies where Gradle should look for dependencies.

- **Maven Central:** The `mavenCentral()` method adds the Maven Central repository, which is a widely used repository for open-source libraries.

#### 5. Dependencies Block

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

#### 6. Java Toolchain Block

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

#### 7. Application Block

```kotlin {1-4} showLineNumbers title="Application"
application {
    // Define the main class for the application.
    mainClass.set("technical.writer.project.App")
}
```

The `application` block configures the application plugin.

- **Main Class:** The `mainClass.set("technical.writer.project.App")` line defines the entry point of the application.
When the application is run, the specified class (`technical.writer.project.App`) will be used as the main class.

#### 8. Custom Test Task Configuration

```kotlin {1-4} showLineNumbers title="Test Task Configuration"
tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
}
```

This block customizes the behavior of the `test` task.

- **JUnit Platform:** The `useJUnitPlatform()` method configures the `test` task to use the [JUnit](https://junit.org/junit5/ "Link to the website of JUnit") Platform for discovering and running tests.
This is necessary for running JUnit Jupiter tests.

#### 9. Configure the Custom Plugin Extension

```kotlin {1-6} showLineNumbers title="Configure the Custom Plugin Extension"
configure<GreetingPluginExtension> {
    message.set("Hi from Gradle")
    outputFiles.from(
        buildFile("a.txt"),
        buildFile("b.txt"))
}
```

Configures the custom plugin's extension to set a message and specify the output files.

#### 10. Custom Plugin Definition

```kotlin {1-22} showLineNumbers title="GreetingPlugin Class"
// Custom Plugin
class GreetingPlugin : Plugin<Project> {

    override fun apply(project: Project): Unit = project.run {

        // Add the 'greeting' extension object
        val greeting = extensions.create(
            "greeting",
            GreetingPluginExtension::class,
            project)

        // Add a task that uses the configuration
        tasks {
            register("hello", Greeting::class) {
                group = "Greeting"
                description = "Generates greeting files."
                message.set(greeting.message)
                outputFiles.setFrom(greeting.outputFiles)
            }
        }
    }
}
```

Defines a custom plugin named `GreetingPlugin`.

- **Extension:** Adds an extension named `greeting` for configuring the plugin.
- **Task Registration:** Registers a task named `hello` that generates greeting files based on the extension's configuration.

#### 11. GreetingPluginExtension Class

```kotlin {1-7} showLineNumbers title="GreetingPluginExtension Class"
// Open for extension
open class GreetingPluginExtension(project: Project) {

    val message = project.objects.property<String>()

    val outputFiles: ConfigurableFileCollection = project.files()
}
```

Defines an extension class for the custom plugin.

- **Properties:** Includes a `message` property and an `outputFiles` property to hold the list of output files.

#### 12. Greeting Task Class

```kotlin {1-17} showLineNumbers title="Greeting Task Class"
// Define custom task and task action.
open class Greeting : DefaultTask() {

    @get:Input
    val message = project.objects.property<String>()

    @get:OutputFiles
    val outputFiles: ConfigurableFileCollection = project.files()

    @TaskAction
    fun printMessage() {
        val message = message.get()
        val outputFiles = outputFiles.files
        logger.info("Writing message '$message' to files $outputFiles")
        outputFiles.forEach { it.writeText(message) }
    }
}
```

Defines a custom task class named `Greeting`.

- **Properties:** Includes `message` and `outputFiles` properties for the task inputs and outputs.
- **Task Action:** The `printMessage` method writes the message to the specified output files.

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

:::warning
Run and adjust, this is for now just a copy.

:::

Use the `./gradlew build` command to build the project using [Gradle Wrapper](../fundamentals.md#gradle-wrapper "Link to documentation about the Gradle Wrapper").

<Tabs>
<TabItem value="Command">

```shell title="CLI"
./gradlew build
```

</TabItem>
<TabItem value="Output">

```shell title="Result"
BUILD SUCCESSFUL in 381ms
7 actionable tasks: 7 up-to-date
```

</TabItem>
</Tabs>

## Running the Application

:::warning
Explain the user will first run it to see what it is doing.
In a second step, the user will run the custom task

Adjust the app that is giving a different output that hello world
:::

Use `./gradlew run` run the application.

<Tabs>
<TabItem value="Command">

```shell title="CLI"
./gradlew run
```

</TabItem>
<TabItem value="Output">

```shell title="Result"
> Task :app:run
You are awesome!

BUILD SUCCESSFUL in 392ms
2 actionable tasks: 1 executed, 1 up-to-date
```

</TabItem>
</Tabs>

## Tasks

:::warning
Add here now info that the user will run the custom task after a successful run of the main application.
:::

### Task Overview

:::warning
Add a link to the fundamentals page part about tasks
:::

```shell
./gradlew tasks
```

This will show a list of all possible tasks, as mentioned in the first part, `build` is a task.

![Task Overview Example](/img/gradle-tasks-example.png)

:::warning
Update screen
:::

### Running the `hello` Task

Use `./gradlew hello` run the task.

<Tabs>
<TabItem value="Command">

```shell title="CLI"
./gradlew hello
```

</TabItem>
<TabItem value="Output">

```shell title="CLI Output"
BUILD SUCCESSFUL in 327ms
1 actionable task: 1 executed
```

</TabItem>
<TabItem value="Result">

The task created two files `a.txt` and `b.txt` in the build directory of the project (`app/build`).<br />
Both files contain the sentence "Hi from Gradle!".

Use `pr` to check the content of both files at the same time.

```shell title="CLI"
pr -m -t app/build/a.txt app/build/b.txt
```

```shell title="Output"
Hi from Gradle!			    Hi from Gradle!
```

</TabItem>

</Tabs>