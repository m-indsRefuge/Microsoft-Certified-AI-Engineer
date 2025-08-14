# --- CONFIGURATION ---
# Assumes this script is in the root of your Jekyll project.
$projectRoot = $PSScriptRoot
# CORRECTED: Updated the ChildPath to the correct folder name.
$imageFolder = Join-Path -Path $projectRoot -ChildPath "assets\img\gallery"
$outputFile = Join-Path -Path $projectRoot -ChildPath "_data\gallery.yml"

Write-Host "Starting gallery YAML generation from root: $projectRoot"

# Verify the image folder exists
if (-not (Test-Path -Path $imageFolder)) {
    Write-Host -ForegroundColor Red "ERROR: The image folder was not found at '$imageFolder'. Please ensure this path is correct."
    exit
}

# Ensure the _data directory exists
$dataDirectory = Split-Path -Path $outputFile -Parent
if (-not (Test-Path -Path $dataDirectory)) {
    Write-Host "Creating _data directory..."
    New-Item -ItemType Directory -Path $dataDirectory | Out-Null
}

# Search for .webp images in the corrected folder
Write-Host "Searching for .webp images in '$imageFolder'..."
$imageFiles = Get-ChildItem -Path "$imageFolder\*" -Include *.webp -File

Write-Host "Found $($imageFiles.Count) .webp image(s) in gallery."

# Sort files by numeric basename if possible, otherwise alphabetically
$sortedFiles = $imageFiles | Sort-Object {
    if ([int]::TryParse($_.BaseName, [ref]$null)) {
        [int]$_.BaseName
    } else {
        $_.BaseName
    }
}

# Build the YAML content from the found files
$yamlContent = @()
foreach ($file in $sortedFiles) {
    $artworkNumber = $file.BaseName
    # CORRECTED: Updated the path for the YAML output.
    $imagePath = "/assets/img/gallery/" + $file.Name
    $yamlBlock = @"
- title: "AI Artwork $artworkNumber"
  image: "$imagePath"
  prompt: "Enter prompt here..."
  date: "$(Get-Date -Format 'yyyy-MM-dd')"
"@
    $yamlContent += $yamlBlock
}

# Write the new content to the gallery.yml file
if ($yamlContent.Count -gt 0) {
    $yamlContent | Out-File -FilePath $outputFile -Encoding utf8
    Write-Host -ForegroundColor Green "Success! '$outputFile' has been regenerated with $($yamlContent.Count) entries."
} else {
    Write-Host -ForegroundColor Yellow "Warning: No .webp image files were found in '$imageFolder'. The YAML file was not created."
}