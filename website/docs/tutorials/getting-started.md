---
description: Tutorial/Guide outline.
id: getting-started
sidebar_position: 1
sidebar_label: Getting started
---

import ContentRef from '@site/src/components/ContentRef'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Getting started

This tutorial will guide you through setting up a  "Hello World" Java application using Gradle.

:::warning
Add a bit more info.

Add links to the official tutorials
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

<details>
<summary>Here a better name</summary>
<p>

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

</p>
</details>

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
