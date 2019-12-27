---
type: post
title: 'HOW TO SYNC AZURE BLOB STORAGE WITH AZCOPY'
description: ''
tags: []
url: 'https://www.thomasmaurer.ch/2019/11/how-to-sync-azure-blob-storage-with-azcopy/'
date: 2019-11-26
---

# HOW TO SYNC AZURE BLOB STORAGE WITH AZCOPY

A couple of months ago, I wrote a blog about [how you can sync files to Azure Blob storage using AzCopy](https://www.thomasmaurer.ch/2019/06/sync-folder-with-azure-blob-storage/). Today I got an exciting update from one of my issues for AzCopy on [GitHub](https://github.com/Azure/azure-storage-azcopy/issues/116#issuecomment-554186120), AzCopy version 10.3 now supports the synchronization feature from Azure Blob storage to Azure Blob storage. This means you can now sync Azure Blob to Azure Blob using AzCopy.

> Azure Blob <-> Azure Blob (Source must include a SAS or is publicly accessible; either SAS or OAuth authentication can be used for destination)

## How to Sync Azure Blob storage to Azure Blob Storage

To get started, you will need to [install and set up AzCopy](https://www.thomasmaurer.ch/2019/05/how-to-install-azcopy-for-azure-storage/) or use AzCopy in [Azure Cloud Shell](https://www.thomasmaurer.ch/2019/01/azure-cloud-shell/).

You can use the following command to sync a blob on Azure Blob storage to another Azure Blob. This command will only sync changed and new files, it compares file names and last modified timestamps.

```
azcopy sync "https://[account].blob.core.windows.net/[container]/[path/to/blob]?[SAS]" "https://[account].blob.core.windows.net/[container]/[path/to/blob]?[SAS]"
```

For the destination, you can either use SAS or OAuth. To synchronize a whole container or folder from one storage account to another, you can use the following command:

```
azcopy sync "https://[account].blob.core.windows.net/[container]?[SAS]" "https://[account].blob.core.windows.net/[container]"
```

or as an example, here I am copying files from a container in an Azure storage account in the North Europe region to another storage account in the West Europe region.

[![Azure Storage Accounts](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Azure-Storage-Accounts-768x407.jpg)Azure Storage Accounts](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Azure-Storage-Accounts.jpg)

[For that, I use the following command](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Azure-Storage-Accounts.jpg)

```
azcopy sync "https://tomnortheurope.blob.core.windows.net/myfiles?[SAS]" "https://tomwesteurope.blob.core.windows.net/destinationfiles?[SAS]" --recursive=true
```

[![Sync Azure Blob Storage with AzCopy](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Sync-Azure-Blob-Storage-with-AzCopy-768x390.jpg)Sync Azure Blob Storage with AzCopy](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Sync-Azure-Blob-Storage-with-AzCopy.jpg)

[You can see that on the first run, it did copy all the files from the source storage account to the destination. On the second run, it didn’t copy any file since they did already exist.](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Sync-Azure-Blob-Storage-with-AzCopy.jpg)

[![Synced Azure Storage Accounts](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Synced-Azure-Storage-Accounts-768x324.jpg)Synced Azure Storage Accounts](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Synced-Azure-Storage-Accounts.jpg)

[There are a couple of additional parameters that you can use. You can find more about the AzCopy sync command on ](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Synced-Azure-Storage-Accounts.jpg)[Microsoft Docs](https://docs.microsoft.com/en-us/azure/storage/common/storage-ref-azcopy-sync?WT.mc_id=thomasmaurer-blog-thmaure).

**–block-size-mb** float Use this block size (specified in MiB) when uploading to Azure Storage or downloading from Azure Storage. Default is automatically calculated based on file size. Decimal fractions are allowed (For example: 0.25).

**–check-md5** string Specifies how strictly MD5 hashes should be validated when downloading. This option is only available when downloading. Available values include: NoCheck, LogOnly, FailIfDifferent, FailIfDifferentOrMissing. (default ‘FailIfDifferent’). (default “FailIfDifferent”)

**–delete-destination** string Defines whether to delete extra files from the destination that are not present at the source. Could be set to true, false, or prompt. If set to prompt, the user will be asked a question before scheduling files and blobs for deletion. (default ‘false’). (default “false”)

**–exclude-attributes** string (Windows only) Exclude files whose attributes match the attribute list. For example: A;S;R

**–exclude-pattern** string Exclude files where the name matches the pattern list. For example: *.jpg;*.pdf;exactName

**-h, –help** help for sync

**–include-attributes** string (Windows only) Include only files whose attributes match the attribute list. For example: A;S;R

**–include-pattern** string Include only files where the name matches the pattern list. For example: *.jpg;*.pdf;exactName

**–log-level** string Define the log verbosity for the log file, available levels: INFO(all requests and responses), WARNING(slow responses), ERROR(only failed requests), and NONE(no output logs). (default INFO). (default “INFO”)

**–put-md5** Create an MD5 hash of each file and save the hash as the Content-MD5 property of the destination blob or file. (By default, the hash is NOT created.) Only available when uploading.

**–recursive** True by default, look into sub-directories recursively when syncing between directories. (default true). (default true)

If you want to know more about syncing a local folder to Azure blob storage, check out my blog post [here](https://www.thomasmaurer.ch/2019/06/sync-folder-with-azure-blob-storage/). I hope this gives you a quick overview of how you can sync Azure blob storage using AzCopy. If you want to know more, check out the Microsoft Docs about how you can [transfer data using AzCopy](https://docs.microsoft.com/en-us/azure/storage/common/storage-ref-azcopy-sync?WT.mc_id=thomasmaurer-blog-thmaure). If you have any questions, please let me know in the comments.