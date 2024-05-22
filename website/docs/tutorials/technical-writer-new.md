---
description: Tutorial/Guide outline.
id: technical-writer-new
sidebar_position: 3
sidebar_label: Technical Writer
tags:
  - Tutorial
  - Intermediate
---

:::info
In this tutorial, all examples are macOS based.
:::

:::warning
Update build file

Add command and output tabs to be consistent
::::

# Technical Writer

This tutorial will guide you through setting up a  "Technical Writer" Java application using Gradle.

You will learn how to create and use custom tasks using a Gradle Plugin to create test files in the build directory (`app/build`) of the application.

:::warning
Enhance above.

Fix the Plugin the output needs to be improved, this is not even a sentence.
:::

## Prerequisites

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

## Initializing the Project

Check if that is needed per project

Use the `gradle init` command to generate a new Gradle project:

```shell
gradle init --type java-application  --dsl kotlin
```

Explain and link to the *init* docs to add more info.

:::warning
You for above the content from getting-started
:::

## Understanding the Project Files

:::warning
Explain the files below.
:::

### Settings file

```kotlin showLineNumbers title="settings.gradle.kts"
plugins {
    // Apply the foojay-resolver plugin to allow automatic download of JDKs
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.7.0"
}

rootProject.name = "technical-writer-project"
include("app")
```

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

// Run the task and create the files *a.txt and b.txt)
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

## Building the Project

In your terminal, change into the first project and run the following command to build the project by using the Gradle Wrapper included into this project.

Run the following command to build the project by using the [Gradle Wrapper](../fundamentals.md#gradle-wrapper "Link to documentation about the Gradle Wrapper").

```shell title="CLI"
./gradlew build
```

:::warning
Explain that "build: is a task, explain that below and add a link to below

Add output example, maybe in a tab.
:::

## Running the Application

To run the application, use the following command:

```shell
./gradlew run
```

You should see the output:

```shell
> Task :run
Hello, World!
```

Congratulations!


In the second part of this guide/tutorial, you will learn about Gradle tasks and plugins.

:::warning
Should that be called the second part?

Should I add the file customization to the beginning?
:::

## Tasks

In your terminal:

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

### Running the hello Task

:::warning
Enhance above heading
:::

In your terminal:

```shell
./gradlew hello
```

This will run the **hello** task, it will create two files (Check that and add screen which contain "Hello Word".

```shell title="CLI"
ls app/build
a.txt
b.txt
```

## Conclusion

:::warning
Adjust below
:::

Congratulations! You've successfully created a  "Hello World" application using Gradle. You've learned how to set up a Gradle project, customize the *build.gradle* file, add dependencies, and run your application.
Gradle is a powerful tool with many features for managing and automating your builds, so continue exploring its capabilities to make the most of it.
