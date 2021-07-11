---
title: Integrate MJML and Thymeleaf in Spring Boot
date: 2021-07-01
description: Integrating MJML and Thymeleaf using Gulp and Maven in Spring Boot
tagz:
  - spring boot
  - mjml
  - thymeleaf
  - gulp
  - maven
---

**Note:** This is not a very detailed tutorial. It assumes that you have a working Thymeleaf setup with localization/resource bundles.


Process:

<blockquote class="text-center"><b>MJML</b><i> (compile time)</i> -> <b>Thymeleaf</b><i> (run time)</i> -> <b>Plain HTML</b></blockquote>

## Prerequisites 

We need to initiate nodejs project where the maven project is.

    yarn init

### NodeJS Dependencies

Install gulp, mjml and cache plugings.

    yarn install gulp gulp-mjml gulp-cache

### Maven Plugins

 Put `exec-maven-plugin` to plugins sections in your *pom.xml*.

```xml
<plugin>
    <artifactId>exec-maven-plugin</artifactId>
    <groupId>org.codehaus.mojo</groupId>
    <version>3.0.0</version>
    <executions>
        <execution>
            <id>mjml</id>
            <phase>initialize</phase>
            <goals>
                <goal>exec</goal>
            </goals>
            <configuration>
                <executable>yarn</executable>
                <arguments>
                    <argument>gulp</argument>
                    <argument>mjml</argument>
                </arguments>
            </configuration>
        </execution>
    </executions>
</plugin>
```

This goal executes `yarn gulp mjml` command.

## Create Gulp task

Create `gulpfile.js` with the following content in the root folder.

```js
const {task, src, dest} = require("gulp");
const mjml = require("gulp-mjml")
const cache = require("gulp-cache");

task("mjml", () => {
    return src("src/main/resources/templates/emails/*.mjml")
        .pipe(
            cache(
                mjml(),
                {
                    name: "emails",
                }
            )
        )
        .pipe(dest("target/classes/templates/emails/"))
})
```

This task compiles **mjml** files in _src/main/resources/templates/emails_ folder and copies them to _target/classes/templates/emails_ folder with **html** file extension. We need to execute this task before running the application since Thymeleaf expects HTML files.

You should change these folders according to your folder structure.

Also, we cached generated files to speed up the task since we need to execute the task before running the application every time.

## Configure Intellij Idea

Add *Run maven goal* task in before launch section of your current Run/Debug configuration. Commandline input must be filled with `exec:exec@mjml`.


## Example Files

### src/main/resources/templates/emails/password-reset.mjml

```html
<mjml>
  <mj-head>
      <mj-title>[[#{template.email.password-reset.subject}]]</mj-title>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="16px" font-family="helvetica">
          <b th:text="#{template.email.password-reset.title}">We received your request</b>
        </mj-text>

        <mj-button background-color="#00a8be">
          <a th:href="#{template.email.password-reset.link(${code}, ${lang})}"
            th:text="#{template.email.password-reset.button}"
            style="color: white !important; text-decoration: none !important;"
          >
            Reset password
          </a>
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

### src/main/resources/messages/TemplateResources.properties

```properties
template.email.password-reset.link=@app_url_web@/reset-password?code={0}&lang={1}
```

### src/main/resources/messages/TemplateResources_en_US.properties

```properties
template.email.password-reset.subject=Reset password
template.email.password-reset.title=We received your request
template.email.password-reset.button=Reset password
```

### src/main/resources/messages/TemplateResources_tr_TR.properties

```properties
template.email.password-reset.subject=Şifre sıfırlama
template.email.password-reset.title=İsteğinizi aldık
template.email.password-reset.button=Şifreyi sıfırla
```