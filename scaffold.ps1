# scaffold.ps1
#
# PowerShell Script to Scaffold the AI-102 Study Journey Jekyll Site
#
# HOW TO RUN:
# 1. Save this file as "scaffold.ps1" in your user directory (e.g., C:\Users\Nolan\).
# 2. Open PowerShell.
# 3. Navigate to the directory where you saved the script (e.g., cd C:\Users\Nolan).
# 4. Run the script by typing: .\scaffold.ps1
#
# NOTE: If you get an execution policy error, you may need to run this command first:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# --- CONFIGURATION ---
# The base path for your project. All folders and files will be created inside this directory.
$basePath = "C:\Users\Nolan\ai-102-study-journey"

# --- SCRIPT BODY ---
Write-Host "Starting to scaffold the Jekyll project at: $basePath" -ForegroundColor Green

# Create the main project directory if it doesn't exist
if (-not (Test-Path -Path $basePath)) {
    New-Item -ItemType Directory -Path $basePath | Out-Null
    Write-Host "Created base directory: $basePath"
}

# --- 1. Create Core Jekyll and Content Directories ---
$directories = @(
    # Jekyll-specific folders (prefixed with _)
    "_data",
    "_includes",
    "_layouts",

    # Content and asset folders
    "assets",
    "assets/css",
    "assets/js",
    "assets/img",
    "downloads",
    "downloads/calendar",
    "downloads/flashcards",
    "summaries",
    "summaries/weeks",
    "videos",
    "videos/recordings"
)

foreach ($dir in $directories) {
    $fullPath = Join-Path -Path $basePath -ChildPath $dir
    if (-not (Test-Path -Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath | Out-Null
        Write-Host "Created directory: $fullPath"
    }
}

# --- 2. Create Boilerplate Files with Content ---

# Jekyll Configuration File
$configFile = Join-Path -Path $basePath -ChildPath "_config.yml"
$configContent = @"
# Basic Jekyll Configuration for AI-102 Study Journey

# Site settings
title: AI-102 Study Journey
email: your-email@example.com
description: >- # this means to ignore newlines until "baseurl:"
  A personal study journey and public resource hub for the Microsoft AI-102 Certification.
baseurl: "/ai-102-study-journey" # the subpath of your site, e.g. /blog. If hosted at root, leave empty.
url: "https://your-github-username.github.io" # the base hostname & protocol for your site
github_username: your-github-username

# Define collections for structured content like weekly summaries
collections:
  weeks:
    output: true
    permalink: /weeks/:path/

# Build settings
theme: minima
plugins:
  - jekyll-feed

# Exclude from processing
# exclude:
#   - Gemfile
#   - Gemfile.lock
"@
Set-Content -Path $configFile -Value $configContent -Force
Write-Host "Created file with content: $configFile"

# Default Layout File
$layoutFile = Join-Path -Path $basePath -ChildPath "_layouts\default.html"
$layoutContent = @"
<!DOCTYPE html>
<html lang=`"en`">
<head>
    <meta charset=`"UTF-8`">
    <meta name=`"viewport`" content=`"width=device-width, initial-scale=1.0`">
    <title>{{ page.title | default: site.title }}</title>
    <script src=`"https://cdn.tailwindcss.com`"></script>
    <link rel=`"stylesheet`" href=`"{{ '/assets/css/style.css' | relative_url }}`">
</head>
<body class=`"bg-gray-900 text-white`">
    {% include header.html %}
    <main class=`"container mx-auto px-4 py-8`">
        {{ content }}
    </main>
    {% include footer.html %}
</body>
</html>
"@
Set-Content -Path $layoutFile -Value $layoutContent -Force
Write-Host "Created file with content: $layoutFile"

# Header Include
$headerFile = Join-Path -Path $basePath -ChildPath "_includes\header.html"
$headerContent = @"
<header class=`"bg-gray-800 shadow`">
    <nav class=`"container mx-auto px-4 py-4 flex justify-between items-center`">
        <a href=`"{{ '/' | relative_url }}`" class=`"text-xl font-bold text-teal-400`">AI-102 Journey</a>
        <div>
            <a href=`"{{ '/weekly.html' | relative_url }}`" class=`"text-gray-300 hover:text-white px-3`">Weekly Plan</a>
            <a href=`"{{ '/flashcards.html' | relative_url }}`" class=`"text-gray-300 hover:text-white px-3`">Flashcards</a>
            <a href=`"{{ '/summaries.html' | relative_url }}`" class=`"text-gray-300 hover:text-white px-3`">Summaries</a>
            <a href=`"{{ '/videos.html' | relative_url }}`" class=`"text-gray-300 hover:text-white px-3`">Videos</a>
            <a href=`"{{ '/resources.html' | relative_url }}`" class=`"text-gray-300 hover:text-white px-3`">Resources</a>
        </div>
    </nav>
</header>
"@
Set-Content -Path $headerFile -Value $headerContent -Force
Write-Host "Created file with content: $headerFile"

# Footer Include
$footerFile = Join-Path -Path $basePath -ChildPath "_includes\footer.html"
$footerContent = @"
<footer class=`"bg-gray-800 mt-12`">
    <div class=`"container mx-auto px-4 py-6 text-center text-gray-400`">
        <p>&copy; $((Get-Date).Year) Nolan [Your Name]. All rights reserved.</p>
        <p>This project is licensed under the MIT License.</p>
    </div>
</footer>
"@
Set-Content -Path $footerFile -Value $footerContent -Force
Write-Host "Created file with content: $footerFile"

# --- 3. Create Top-Level HTML Placeholder Pages ---
$htmlFiles = @(
    "index.html",
    "weekly.html",
    "flashcards.html",
    "summaries.html",
    "videos.html",
    "resources.html"
)

foreach ($file in $htmlFiles) {
    $filePath = Join-Path -Path $basePath -ChildPath $file
    $pageName = ($file -split '\.')[0]
    $pageTitle = $pageName.Substring(0,1).ToUpper() + $pageName.Substring(1)
    $htmlContent = @"
---
layout: default
title: $pageTitle
---

<h1 class=`"text-4xl font-bold text-teal-400`">$pageTitle</h1>
<p class=`"mt-4 text-gray-300`">Content for the $pageName page will go here.</p>
"@
    Set-Content -Path $filePath -Value $htmlContent -Force
    Write-Host "Created file with content: $filePath"
}

# --- 4. Create Other Placeholder and Data Files ---

# README.md
$readmeFile = Join-Path -Path $basePath -ChildPath "README.md"
$readmeContent = @"
# AI-102 Study Journey

This repository documents my personal study journey for the Microsoft AI-102: Designing and Implementing a Microsoft Azure AI Solution certification.

It serves as both a personal knowledge base and a public resource for others on the same path.

## How to Use This Site

The accompanying GitHub Pages site contains interactive study guides, flashcards, weekly summaries, and other resources.

## Built With

* [Jekyll](https://jekyllrb.com/)
* [Tailwind CSS](https://tailwindcss.com/)

"@
Set-Content -Path $readmeFile -Value $readmeContent -Force
Write-Host "Created file with content: $readmeFile"

# LICENSE
$licenseFile = Join-Path -Path $basePath -ChildPath "LICENSE"
$licenseContent = @"
MIT License

Copyright (c) $((Get-Date).Year) Nolan [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the `"Software`"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED `"AS IS`", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"@
Set-Content -Path $licenseFile -Value $licenseContent -Force
Write-Host "Created file with content: $licenseFile"

# Flashcard Data File
$flashcardFile = Join-Path -Path $basePath -ChildPath "_data\flashcards.json"
$flashcardContent = @"
[
    {
        `"q`": `"What are the four main categories of Azure Cognitive Services?`",
        `"a`": `"Vision, Speech, Language, and Decision.`"
    },
    {
        `"q`": `"What is the primary function of Azure Computer Vision?`",
        `"a`": `"To analyze visual content and extract information from images.`"
    }
]
"@
Set-Content -Path $flashcardFile -Value $flashcardContent -Force
Write-Host "Created file with content: $flashcardFile"

# Example Weekly Summary
$week1File = Join-Path -Path $basePath -ChildPath "summaries\weeks\week-01.md"
$week1Content = @"
---
title: `"Week 1: Orientation + Plan & Manage AI`"
date: $(Get-Date -Format 'yyyy-MM-dd')
tags: [planning, responsible-ai, cognitive-services]
---

## Key Topics Covered

* Azure AI Services overview
* Solution planning and cost/performance tradeoffs
* Responsible AI principles
* Versioning and CI/CD concepts

## Lab Focus

The primary lab focus this week was on deploying a Cognitive Services resource and understanding the security options (keys vs. Azure AD).

## Key Takeaways

My main takeaway is the importance of the Responsible AI standard. It's not just a feature, but a foundational requirement for building modern AI solutions.
"@
Set-Content -Path $week1File -Value $week1Content -Force
Write-Host "Created file with content: $week1File"

# Empty placeholder files
New-Item -ItemType File -Path (Join-Path -Path $basePath -ChildPath "assets\css\style.css") -Force | Out-Null
New-Item -ItemType File -Path (Join-Path -Path $basePath -ChildPath "assets\js\main.js") -Force | Out-Null
New-Item -ItemType File -Path (Join-Path -Path $basePath -ChildPath "downloads\calendar\.gitkeep") -Force | Out-Null
New-Item -ItemType File -Path (Join-Path -Path $basePath -ChildPath "downloads\flashcards\.gitkeep") -Force | Out-Null
New-Item -ItemType File -Path (Join-Path -Path $basePath -ChildPath "assets\img\.gitkeep") -Force | Out-Null
New-Item -ItemType File -Path (Join-Path -Path $basePath -ChildPath "videos\recordings\.gitkeep") -Force | Out-Null

Write-Host ""
Write-Host "Scaffolding complete!" -ForegroundColor Green
Write-Host "You can now open the folder in your favorite editor (e.g., VS Code) and run 'bundle exec jekyll serve' to see the site."

