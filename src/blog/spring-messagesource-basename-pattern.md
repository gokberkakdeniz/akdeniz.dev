---
title: Dynamic message sources with pattern in Spring Boot
date: 2021-07-11
description: Loading message sources using PathMatchingResourcePatternResolver in Spring Boot
tagz:
  - spring boot
  - java
---

The number of resource bundles increases when developing multi-language APIs in Spring. Adding a new resource bundle to the **Bean** each time can be overwhelming.

Although <span style="word-break: break-all;">**ReloadableResourceBundleMessageSource.setBasenames**</span> does not support patterns, 
the problem can be solved using <span style="word-break: break-all;">**org.springframework.core.io.support.PathMatchingResourcePatternResolver**</span>.

```java
@Bean
public MessageSource messageSource() throws IOException {
  ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

  PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver(
    getClass().getClassLoader()
  );
  // Find all resource files in src/main/resources/messages folder.
  Resource[] resources = resolver.getResources("classpath:messages/**/*.properties");

  Path classpath = Path.of(
    org.apache.commons.lang3.StringUtils.substringBefore(System.getProperty("java.class.path"), ":")
  );

  var basenames = new HashSet<String>();

  for (var resource : resources) {
    String basename;
    if (resource instanceof FileSystemResource) { // The executable is class file (target/classes etc).
      // Extract class path to find resource name.
      basename = classpath.relativize(resource.getFile().toPath()).toString();
    } else if (resource instanceof ClassPathResource) { // The process is jar-like single file.
      basename = ((ClassPathResource) resource).getPath();
    } else {
      throw new IllegalStateException("Resource must be either FileSystemResource or ClassPathResource.");
    }

    // Remove file extension and language code from file name.
    String resourceName = basename.replaceAll("(|_[a-z]{2}_[A-Z]{2}).properties$", "");

    basenames.add("classpath:" + resourceName);
  }

  // Load collected basenames.
  messageSource.setBasenames(basenames.toArray(String[]::new));
  // Configure message source...
  messageSource.setDefaultEncoding("UTF-8");

  return messageSource;
}
```
