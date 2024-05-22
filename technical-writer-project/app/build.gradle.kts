apply<GreetingPlugin>()

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

configure<GreetingPluginExtension> {

    message.set("Hi from Gradle")
    outputFiles.from(
        buildFile("a.txt"),
        buildFile("b.txt"))
}

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
                message.set(greeting.message)
                outputFiles.setFrom(greeting.outputFiles)
            }
        }
    }
}

open class GreetingPluginExtension(project: Project) {

    // Test 1 adjust the line below as seen in:
    // https://github.com/cbeust/kotlin-dsl/blob/master/samples/provider-properties/build.gradle.kts
    //val message = "hiya"
    val message = project.objects.property<String>()

    val outputFiles: ConfigurableFileCollection = project.files()
}

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
