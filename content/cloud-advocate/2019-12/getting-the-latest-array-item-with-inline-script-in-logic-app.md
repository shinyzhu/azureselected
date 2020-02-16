---
type: post
status: translated
title: '在Logic App中使用内联脚本获取最新的数组项'
description: '1. This post shows how to use the inline JavaScript code action to perform the array sort in a Logic App workflow, and discuss what to consider to use this action. 2. Readers will learn how to use pure JavaScript code for array sort in Logic App workflow, and understand the cost implication and impact on its use.'
tags: ['Azure Logic Apps', 'Azure Blob Storage']
author: 'Justin Yoo'
date: 2019-11-14
url: 'https://devkimchi.com/2019/11/14/getting-the-latest-array-item-with-inline-script-in-logic-app/'
translator: 'yan_xiaodi'
---

# 在Logic App中使用内联脚本获取最新的数组项

<ContentMeta />

在我的[上一篇文章](https://devkimchi.com/2019/11/06/getting-the-latest-array-item-in-logic-app/)中，通过组合使用[`Select`动作](https://docs.microsoft.com/azure/logic-apps/logic-apps-workflow-actions-triggers?WT.mc_id=devkimchicom-blog-juyoo#select-action)和[`Filter`动作](https://docs.microsoft.com/azure/logic-apps/logic-apps-workflow-actions-triggers?WT.mc_id=devkimchicom-blog-juyoo#query-action)，我们已经了解了如何使用[Logic App](https://docs.microsoft.com/azure/logic-apps/logic-apps-overview?WT.mc_id=devkimchicom-blog-juyoo)工作流来获取一个数组中的最新的项。事实上，虽然这种做法是可行的，但它仅适用于一些特定的使用情况，对大多数情况来说，这个解决方案有点棘手。但是，有一个预览功能：[内联 JavaScript 代码动作](https://docs.microsoft.com/azure/logic-apps/logic-apps-add-run-inline-code?WT.mc_id=devkimchicom-blog-juyoo)，可以方便地对数组排序。在这篇文章中，我将讨论如何使用[内联 JavaScript 代码动作](https://docs.microsoft.com/azure/logic-apps/logic-apps-add-run-inline-code?WT.mc_id=devkimchicom-blog-juyoo)排序数组项，并获取 Logic App 工作流中的最新的项。

## 集成账户

为了使用这个内联 JavaScript 代码动作，我们必须提供一个[集成账户](https://docs.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-create-integration-account?WT.mc_id=devkimchicom-blog-juyoo)实例。集成帐户有[三种定价层](https://docs.microsoft.com/azure/logic-apps/logic-apps-pricing?WT.mc_id=devkimchicom-blog-juyoo#integration-accounts) - 免费、基本和标准。对于我们的例子来说，免费的已经足够了。

一旦提供了集成帐户实例，将其与现有的 Logic App 实例连接起来以使用动作。

![img](https://sa0blogs.blob.core.windows.net/devkimchi/2019/11/getting-the-latest-array-item-with-inline-script-in-logic-app-03.png)

## JavaScript 支持

目前，该动作仅支持 node.js `8.11.1`的[内置函数](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects)。我们无法通过`npm`导入外部库。因此，我们不能依赖于任何[`require()`](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_require)语句。所有内容**必须**被包含在该动作中。

## 内联 JavaScript 代码

让我们来看看下面的 JavaScript 代码。它不涉及 Logic App，只是纯 JavaScript 代码。如果您在 node.js 的控制台运行这段代码，它将返回`20191104.json`最新的文件路径值，这也是预期的值。 [JavaScript 的数组排序功能](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)需要一个单独的回调函数，其中包含排序逻辑。

```javascript
"use strict";

var items = [
  {
"Name": "20191101.json",
"Path": "/path/20191101.json"
  },
  {
"Name": "20191102.json",
"Path": "/path/20191102.json"
  },
  {
"Name": "20191103.json",
"Path": "/path/20191103.json"
  },
  {
"Name": "20191104.json",
"Path": "/path/20191104.json"
  }
];

var sorted = items.sort(function (a, b) {
var dateA = a.Name.replace('.json', '');
var dateB = b.Name.replace('.json', '');

// dateA is later than dateB: dateA gets the lower index.
if (dateA > dateB) {
return -1;
  }

// dateA is older than dateB: dateB gets the lower index.
if (dateA < dateB) {
return 1;
  }

// dateA and dateB is the same
return 0;
});

var result = sorted[0].Path;

console.log(result);
```

回调函数**应该**返回`-1`，`0`或`1`。

- 返回 `-1` 表示，在数组元素 `a` 和 `b` 中，`a` 会被排列到 `b` 之前。
- 返回 `1` 表示 `b` 会被排列到 `a` 之前。

因此，回调函数把 `a` 和 `b` 的 `Name` 属性值去掉 `.json`，将这两个值进行相互比较，较大的值位于数组项的上部位置（即较低的索引）。换句话说，数组项以降序进行排序。

> 如果你想知道更多有关排序的信息，请参考[此页面](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)。

现在，让我们将这个代码应用到 Logic App。

## 内联 JavaScript 代码动作

让我们添加一个[内嵌JavaScript代码](https://docs.microsoft.com/azure/logic-apps/logic-apps-add-run-inline-code?WT.mc_id=devkimchicom-blog-juyoo)动作。

![img](https://sa0blogs.blob.core.windows.net/devkimchi/2019/11/getting-the-latest-array-item-with-inline-script-in-logic-app-01.png)

然后进入动作的 JavaScript 代码。这几乎等同于上面的例子，但有两个地方有所不同。

```javascript
"use strict";


// Assign the array value from the output of the previous action, `List Backups`.
var items = workflowContext.actions.List_Backups.outputs.body.value;


var sorted = items.sort(function (a, b) {
  var dateA = a.Name.replace('.json', '');
  var dateB = b.Name.replace('.json', '');


  if (dateA > dateB) {
    return -1;
  }


  if (dateA < dateB) {
    return 1;
  }


  return 0;
});


var result = sorted[0].Path;


// Returns the result as output.
return result;
```

- 该 `items` 变量获取上一个操作——`List Backups`的输出值作为数组项。
- 在最后一行，它使用了 `return` 语句把动作的结果发送到 `outputs` 值。

如果我们想引用这个动作的结果，这个工作流中的任何之后的动作都可以使用`outputs('ACTION_NAME')?['body']`。

## 比较

现在，我们只使用这种内联 Javascript 代码动作来解决排序问题。让我们来比较一下相同的结果，请参考[上一篇文章](https://devkimchi.com/2019/11/06/getting-the-latest-array-item-in-logic-app/)与下面的图片。

![img](https://sa0blogs.blob.core.windows.net/devkimchi/2019/11/getting-the-latest-array-item-with-inline-script-in-logic-app-02.png)

右侧是我们在[上一篇文章](https://devkimchi.com/2019/11/06/getting-the-latest-array-item-in-logic-app/)中创建的。至少我们**应该**同时使用`从备份中选择文件名`动作（`Select`）和`获取最新备份`动作（`Filter`）。如果我们希望有一个更优雅的方式，需要在之前和之后有一些额外的动作。

另一方面，如果我们使用[内联 JavaScript 代码动作](https://docs.microsoft.com/azure/logic-apps/logic-apps-add-run-inline-code?WT.mc_id=devkimchicom-blog-juyoo)，如左侧所示，我们只需要一个动作。

但有一点需要注意。我们必须有与使用该内联代码动作相关联的[集成账户](https://docs.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-create-integration-account?WT.mc_id=devkimchicom-blog-juyoo)。集成账户的固定价格相当昂贵——[US$ 302.4 (基本) and US$ 986.4 (标准) 每月](https://azure.microsoft.com/pricing/details/logic-apps/?WT.mc_id=devkimchicom-blog-juyoo)。如果您的组织已经使用集成帐户，那没问题。然而，如果还没有，您**应该**非常小心您的账单。

------

到目前为止，我们已经了解如何使用[内嵌 JavaScript 代码动作](https://docs.microsoft.com/azure/logic-apps/logic-apps-add-run-inline-code?WT.mc_id=devkimchicom-blog-juyoo)在 Logic App 工作流内排序数组项。它功能强大，但价格昂贵。因此，只有当您的组织能够负担成本时，再使用它。
