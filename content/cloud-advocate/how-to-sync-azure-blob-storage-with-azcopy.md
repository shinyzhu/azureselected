---
type: post
status: translated
sidebar: auto
title: '如何使用 AZCOPY 同步 Azure Blob 存储'
description: '几个月前，我写了一篇关于如何使用 AzCopy 同步文件到 Azure Blob 存储的博客。今天针对我在 GitHub上使用 AzCopy 的一个问题，有了一个激动人心的更新。这意味着您现在可以使用 AzCopy 从 Azure Blob 到 Azure Blob。'
tags: ['Cloud', 'Microsoft', 'Microsoft Azure', 'Microsoft Azure Stack', 'Powershell']
author: 'Thomas Maurer'
date: 2019-11-26
url: 'https://www.thomasmaurer.ch/2019/11/how-to-sync-azure-blob-storage-with-azcopy/'
translator: 'haoguanjun'
reviewer: 'shinyzhu'
pub_date: 2020-01-06
---

# 如何使用 AZCOPY 同步 Azure Blob 存储

<ContentMeta />

> 几个月前，我写了一篇关于 [如何使用 AzCopy 同步文件到 Azure Blob 存储](https://www.thomasmaurer.ch/2019/06/sync-folder-with-azure-blob-storage/) 的博客。今天针对我在 [GitHub](https://github.com/Azure/azure-storage-azcopy/issues/116#issuecomment-554186120) 上使用 AzCopy 的一个问题，有了一个激动人心的更新。这意味着您现在可以使用 AzCopy 从 Azure Blob 到 Azure Blob。

> Azure Blob <-> Azure Blob (源必须包括共享访问令牌 SAS 或者可公共访问，对于目标可以支持共享访问令牌  SAS 或者 OAuth 认证)

## 如何在 Azure Blob 存储之间同步

作为准备工作，您将需要 `安装并设置 AzCopy` ，或者在 [Azure Cloud Shell](https://www.thomasmaurer.ch/2019/01/azure-cloud-shell/) 中使用 AzCopy.

您可以使用下述命令将 Azure blob 存储同步到另外一个 Azure Blob 中。该命令将仅仅同步发生变化和新建的文件。其比较文件的名称和最后修改时间戳。

```
azcopy sync "https://[account].blob.core.windows.net/[container]/[path/to/blob]?[SAS]" "https://[account].blob.core.windows.net/[container]/[path/to/blob]?[SAS]"
```

对于目标，你既可以使用 SAS 或者 OAuth。为了同步一个存储账号中的整个容器或者文件夹到另外一个账号，你可以使用下述命令：

```
azcopy sync "https://[account].blob.core.windows.net/[container]?[SAS]" "https://[account].blob.core.windows.net/[container]"
```

作为示例，这里我将从在北欧区的 Azure 存储账号的一个容器中的文件，复制到西欧区的另一个存储账号中。

![Azure 存储帐户](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Azure-Storage-Accounts-768x407.jpg)

我使用如下命令来实现：

```
azcopy sync "https://tomnortheurope.blob.core.windows.net/myfiles?[SAS]" "https://tomwesteurope.blob.core.windows.net/destinationfiles?[SAS]" --recursive=true
```

![使用AzCopy同步Azure Blob存储](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Sync-Azure-Blob-Storage-with-AzCopy-768x390.jpg)

您可以看到，在第一次运行时，它确实将所有文件从源存储帐户复制到了目标位置。 在第二次运行中，它没有复制任何文件，因为文件已经存在了。

![已同步的Azure存储帐户](https://www.thomasmaurer.ch/wp-content/uploads/2019/11/Synced-Azure-Storage-Accounts-768x324.jpg)

下面是一系列可以使用的参数。您可以在[微软 Docs](https://docs.microsoft.com/en-us/azure/storage/common/storage-ref-azcopy-sync?WT.mc_id=thomasmaurer-blog-thmaure)上发现更多的关于 `AzCopy sync` 的命令。

`–block-size-mb`  在上传到 Azure 存储或者从 Azure 存储下载时，使用的块尺寸 (以 MiB 为单位) 。默认基于文件尺寸自动计算。支持使用十进制小数(例如：0.25)。

`–check-md5` 字符串，指定在下载时，如何强制 MD5 散列值用于验证。该选项仅在下载时可用。可用值包括：NoCheck, LogOnly, FailIfDifferent, FailIfDifferentOrMissing. (默认值：‘FailIfDifferent’)。

`–delete-destination` 字符串。定义是否删除源中没有提供的目标中的其它文件。可以设置为： true, false, 或者 prompt。如果设置为 prompt，在删除文件或者 blob 之前，用户将被要求确认 (默认 false)。

`–exclude-attributes` 字符串（仅 Windows)，排除匹配文件属性的文件。例如：A;S;R

`–exclude-pattern` 字符串，排除匹配模板列表的文件，例如：.jpg;*.pdf;exactName

`-h, –help` 使用帮助

`–include-attributes` 字符串 (仅 Windows)，仅包含匹配文件属性列表的文件。例如： A;S;R

`–include-pattern` 字符串，仅包含匹配模板列表的文件。例如： *.jpg;*.pdf;exactName

`–log-level` 字符串， 定义日志文件的日志级别。可用的级别：INFO(所有的请求和响应)， WARNING(慢速响应)， ERROR(仅仅失败的请求)， 以及 NONE(没有输出日志). (默认 INFO). (default “INFO”)

`–put-md5` 对每个文件创建 MD5 散列，并保存将散列值作为目标 blob 或文件的 Content-MD5 属性。 (默认情况下，**不**创建散列)。仅在上传时可用。

`–recursive`  默认为 True，当在目录之间同步的时候，递归进入子目录 (默认为 true)。

如果您希望了解更多关于同步本地文件到 Azure blob 存储的内容，请查看我的博客。我希望这可以帮助您快速查看如何使用 AzCopy 同步 Azure blob 存储。如果您希望学习更多内容，请查看微软 Docs 中关于如何  [使用 AzCopy 传输数据](https://docs.microsoft.com/en-us/azure/storage/common/storage-ref-azcopy-sync?WT.mc_id=thomasmaurer-blog-thmaure)。如果有任何问题，请留言。

