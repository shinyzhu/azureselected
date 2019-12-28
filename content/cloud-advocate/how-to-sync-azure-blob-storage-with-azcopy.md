---
type: post
title: '如何使用 AZCOPY 同步 Azure Blob 存储'
description: ''
tags: []
url: 'https://www.thomasmaurer.ch/2019/11/how-to-sync-azure-blob-storage-with-azcopy/'
date: 2019-11-26
---

# HOW TO SYNC AZURE BLOB STORAGE WITH AZCOPY

# 如何使用 AZCOPY 同步 Azure Blob 存储

A couple of months ago, I wrote a blog about [how you can sync files to Azure Blob storage using AzCopy](https://www.thomasmaurer.ch/2019/06/sync-folder-with-azure-blob-storage/). Today I got an exciting update from one of my issues for AzCopy on [GitHub](https://github.com/Azure/azure-storage-azcopy/issues/116#issuecomment-554186120), AzCopy version 10.3 now supports the synchronization feature from Azure Blob storage to Azure Blob storage. This means you can now sync Azure Blob to Azure Blob using AzCopy.

> Azure Blob <-> Azure Blob (Source must include a SAS or is publicly accessible; either SAS or OAuth authentication can be used for destination)

几个月前，我写了一篇关于 [如何使用 AzCopy 同步文件到 Azure Blob 存储](https://www.thomasmaurer.ch/2019/06/sync-folder-with-azure-blob-storage/) 的博客。今天针对我在 [GitHub](https://github.com/Azure/azure-storage-azcopy/issues/116#issuecomment-554186120) 上使用 AzCopy 的一个问题，有了一个激动人心的更新。这意味着您现在可以使用 AzCopy 从 Azure Blog 到 Azure Blob。

> Azure Blob <-> Azure Blob (源必须包括共享访问令牌 SAS 或者可公共访问，对于目标可以支持共享访问令牌  SAS 或者 OAuth 认证)

## How to Sync Azure Blob storage to Azure Blob Storage

## 如何在 Azure Blob 存储之间同步

To get started, you will need to [install and set up AzCopy](https://www.thomasmaurer.ch/2019/05/how-to-install-azcopy-for-azure-storage/) or use AzCopy in [Azure Cloud Shell](https://www.thomasmaurer.ch/2019/01/azure-cloud-shell/).

作为准备工作，您将需要 `安装并设置 AzCopy` ，或者在 [Azure Cloud Shell](https://www.thomasmaurer.ch/2019/01/azure-cloud-shell/) 中使用 AzCopy.

You can use the following command to sync a blob on Azure Blob storage to another Azure Blob. This command will only sync changed and new files, it compares file names and last modified timestamps.

您可以使用下述命令将 Azure blob 存储同步到另外一个 Azure Blob 中。该命令将仅仅同步发生变化和新建的文件。其比较文件的名称和最后修改时间戳。

```
azcopy sync "https://[account].blob.core.windows.net/[container]/[path/to/blob]?[SAS]" "https://[account].blob.core.windows.net/[container]/[path/to/blob]?[SAS]"
```

For the destination, you can either use SAS or OAuth. To synchronize a whole container or folder from one storage account to another, you can use the following command:

对于目标，你既可以使用 SAS 或者 OAuth。为了同步一个存储账号中的整个容器或者文件夹到另外一个账号，你可以使用下述命令：

```
azcopy sync "https://[account].blob.core.windows.net/[container]?[SAS]" "https://[account].blob.core.windows.net/[container]"
```

or as an example, here I am copying files from a container in an Azure storage account in the North Europe region to another storage account in the West Europe region.

作为示例，这里我将从在北欧区的 Azure 存储账号的一个容器中的文件，复制到西欧区的另一个存储账号中。

[![Azure Storage Accounts](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Azure-Storage-Accounts-768x407.jpg)Azure Storage Accounts](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Azure-Storage-Accounts.jpg)

[For that, I use the following command](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Azure-Storage-Accounts.jpg)

```
azcopy sync "https://tomnortheurope.blob.core.windows.net/myfiles?[SAS]" "https://tomwesteurope.blob.core.windows.net/destinationfiles?[SAS]" --recursive=true
```

[![Sync Azure Blob Storage with AzCopy](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Sync-Azure-Blob-Storage-with-AzCopy-768x390.jpg)Sync Azure Blob Storage with AzCopy](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Sync-Azure-Blob-Storage-with-AzCopy.jpg)

[You can see that on the first run, it did copy all the files from the source storage account to the destination. On the second run, it didn’t copy any file since they did already exist.](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Sync-Azure-Blob-Storage-with-AzCopy.jpg)

[![Synced Azure Storage Accounts](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Synced-Azure-Storage-Accounts-768x324.jpg)Synced Azure Storage Accounts](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Synced-Azure-Storage-Accounts.jpg)

[下面是一系列可以使用的参数。您可以发现更多的关于 AzCopy sync 命令通过 ](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Synced-Azure-Storage-Accounts.jpg)[Microsoft Docs](https://docs.microsoft.com/en-us/azure/storage/common/storage-ref-azcopy-sync?WT.mc_id=thomasmaurer-blog-thmaure).

**–block-size-mb** float Use this block size (specified in MiB) when uploading to Azure Storage or downloading from Azure Storage. Default is automatically calculated based on file size. Decimal fractions are allowed (For example: 0.25).

**–block-size-mb**  在上传到 Azure 存储或者从 Azure 存储下载时，使用的块尺寸 (以 MiB 为单位) 。默认基于文件尺寸自动计算。支持使用十进制小数(例如：0.25)。

**–check-md5** string Specifies how strictly MD5 hashes should be validated when downloading. This option is only available when downloading. Available values include: NoCheck, LogOnly, FailIfDifferent, FailIfDifferentOrMissing. (default ‘FailIfDifferent’). (default “FailIfDifferent”)

**–check-md5** string，指定在下载时，如何强制 MD5 散列值用于验证。该选项仅在下载时可用。可用值包括：NoCheck, LogOnly, FailIfDifferent, FailIfDifferentOrMissing. (默认值：‘FailIfDifferent’)。

**–delete-destination** string Defines whether to delete extra files from the destination that are not present at the source. Could be set to true, false, or prompt. If set to prompt, the user will be asked a question before scheduling files and blobs for deletion. (default ‘false’). (default “false”)

**–delete-destination** string。定义是否删除源中没有提供的目标中的其它文件。可以设置为： true, false, 或者 prompt。如果设置为 prompt，在删除文件或者 blob 之前，用户将被要求确认 (默认 false)。

**–exclude-attributes** string (Windows only) Exclude files whose attributes match the attribute list. For example: A;S;R

**–exclude-attributes** string (仅 Windows)，排除匹配文件属性的文件。例如：A;S;R

**–exclude-pattern** string Exclude files where the name matches the pattern list. For example: *.jpg;*.pdf;exactName

**–exclude-pattern** string，排除匹配模板列表的文件，例如：.jpg;*.pdf;exactName

**-h, –help** help for sync

**-h, –help** 使用帮助

**–include-attributes** string (Windows only) Include only files whose attributes match the attribute list. For example: A;S;R

**–include-attributes** string (Windows only)，仅包含匹配文件属性列表的文件。例如： A;S;R

**–include-pattern** string Include only files where the name matches the pattern list. For example: *.jpg;*.pdf;exactName

**–include-pattern** string，仅包含匹配模板列表的文件。例如： *.jpg;*.pdf;exactName

**–log-level** string Define the log verbosity for the log file, available levels: INFO(all requests and responses), WARNING(slow responses), ERROR(only failed requests), and NONE(no output logs). (default INFO). (default “INFO”)

**–log-level** string 定义日志文件的日志级别。可用的级别：INFO(所有的请求和响应)， WARNING(慢速响应)， ERROR(仅仅失败的请求)， 以及 NONE(没有输出日志). (默认 INFO). (default “INFO”)

**–put-md5** Create an MD5 hash of each file and save the hash as the Content-MD5 property of the destination blob or file. (By default, the hash is NOT created.) Only available when uploading.

**–put-md5** 对每个文件创建 MD5 散列，并保存将散列值作为目标 blob 或文件的 Content-MD5 属性。 (默认情况下，**不**创建散列)。仅在上传时可用。

**–recursive** True by default, look into sub-directories recursively when syncing between directories. (default true). (default true)

**–recursive**  默认为 True，当在目录之间同步的时候，递归进入子目录 (默认为 true)。

If you want to know more about syncing a local folder to Azure blob storage, check out my blog post [here](https://www.thomasmaurer.ch/2019/06/sync-folder-with-azure-blob-storage/). I hope this gives you a quick overview of how you can sync Azure blob storage using AzCopy. If you want to know more, check out the Microsoft Docs about how you can [transfer data using AzCopy](https://docs.microsoft.com/en-us/azure/storage/common/storage-ref-azcopy-sync?WT.mc_id=thomasmaurer-blog-thmaure). If you have any questions, please let me know in the comments.

如果您希望了解更多关于同步本地文件到 Azure blob 存储的内容，请查看我的博客。我希望这可以帮助您快速查看如何使用 AzCopy 同步 Azure blob 存储。如果您希望学习更多内容，请查看 Microsoft Docs 中关于如何  [transfer data using AzCopy](https://docs.microsoft.com/en-us/azure/storage/common/storage-ref-azcopy-sync?WT.mc_id=thomasmaurer-blog-thmaure)。如果有任何问题，请留言。

