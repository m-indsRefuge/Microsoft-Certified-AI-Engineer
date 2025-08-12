# --- CONFIGURATION ---
$projectRoot = $PSScriptRoot
$imageFolder = Join-Path -Path $projectRoot -ChildPath "assets\img\gallery"
$outputFile = Join-Path -Path $projectRoot -ChildPath "_data\gallery.yml"

Write-Host "Starting gallery YAML generation from root: $projectRoot"

if (-not (Test-Path -Path $imageFolder)) {
    Write-Host -ForegroundColor Red "ERROR: The image folder was not found at '$imageFolder'. Please ensure this path is correct."
    exit
}

$dataDirectory = Split-Path -Path $outputFile -Parent
if (-not (Test-Path -Path $dataDirectory)) {
    Write-Host "Creating _data directory..."
    New-Item -ItemType Directory -Path $dataDirectory | Out-Null
}

# Fix here: add wildcard in path and -File to only get files
$imageFiles = Get-ChildItem -Path "$imageFolder\*" -Include *.jpg, *.jpeg, *.png, *.gif -File

Write-Host "Found $($imageFiles.Count) image(s) in gallery."

# Sort files by numeric basename if possible, otherwise lex sort
$sortedFiles = $imageFiles | Sort-Object {
    if ([int]::TryParse($_.BaseName, [ref]$null)) {
        [int]$_.BaseName
    } else {
        $_.BaseName
    }
}

$yamlContent = @()
foreach ($file in $sortedFiles) {
    $artworkNumber = $file.BaseName
    $imagePath = "/assets/img/gallery/" + $file.Name
    $yamlBlock = @"
- title: "AI Artwork $artworkNumber"
  image: "$imagePath"
  prompt: "Enter prompt here..."
  date: "$(Get-Date -Format 'yyyy-MM-dd')"
"@
    $yamlContent += $yamlBlock
}

if ($yamlContent.Count -gt 0) {
    $yamlContent | Out-File -FilePath $outputFile -Encoding utf8
    Write-Host -ForegroundColor Green "Success! '$outputFile' has been generated with $($yamlContent.Count) entries."
} else {
    Write-Host -ForegroundColor Yellow "Warning: No image files found in '$imageFolder'. The YAML file was not created."
}
