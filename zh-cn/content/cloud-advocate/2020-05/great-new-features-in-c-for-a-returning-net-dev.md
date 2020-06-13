---
type: post
status: new
sidebar: auto
title: "C# 中对重返 .NET 的开发人员来说非常棒的新特性"
description: "描述了 C# 中3个新特性"
tags: ['C#', '.NET']
author: 'Chris Noring'
date: 2020-03-04
url: 'https://softchris.github.io/pages/dotnet-csharp-news.html'
translator: ''
reviewer: ''
pub_date: 
---

# C# 中对重返 .NET 的开发人员来说非常棒的新特性

<ContentMeta />

请订阅我的[Twitter](https://twitter.com/chris_noring)，非常乐意接受您的建议或改进 /Chris

> 我离开 .NET 开发已经有一段时间了。实际上我一直在从事全栈 JavaScript 开发，当重新关注 .NET 领域后，我注意到 C# 语言已经添加了一些惊人的功能，以及一些我可以从 JavaScript 和函数式语言中识别出来的特性。这让我非常高兴，因为这意味着 C# 能够从不同的范式及最重要的演化中选择最优秀的部分，变得越来越好。在2000年年初的时候，谁会想到 .NET 现在可以运行在所有平台上？:)
>
> 那么，这些功能有哪些呢？

## 参考资料

- [解构, 元组和对象](https://docs.microsoft.com/en-us/dotnet/csharp/deconstruct?wt.mc_id=devto-blog-chnoring) 该文档涵盖了如何对元组和对象进行解构。它包含了您需要了解的所有内容
- [C# 8.0 中的模式匹配](https://docs.microsoft.com/en-us/archive/msdn-magazine/2019/may/csharp-8-0-pattern-matching-in-csharp-8-0?wt.mc_id=devto-blog-chnoring) C# 8.0 附带了对 C# 7.0 中添加的模式匹配的一些更新。
- [模式匹配概述](https://docs.microsoft.com/en-us/dotnet/csharp/pattern-matching?wt.mc_id=devto-blog-chnoring) 该文档涵盖了现有的不同类型的模式匹配。
- [Records - 记录初探](https://blog.cdemi.io/whats-coming-in-c-8-0-records/)

## -1- Deconstruction - 解构

这是我在 JavaScript 中很喜欢的一个功能，当然在 JavaScript 中它被称为 destructuring。这是什么意思呢？这个想法来自于当你要引用一个对象或一个列表中的项的一些属性，但又不想要全部的属性。让我们来看一个 JavaScript 的例子：

```javascript
// JavaScript example

function getPerson() {
  return {
    name: 'chris',
    company: 'Microsoft',
    title: 'Cloud Advocate' 
  };
}

// without destructuring
const person = getPerson();
console.log(person.name);
console.log(person.company);

// with destructuring
const { name, company } = getPerson();
console.log(name);
console.log(company);
```

你可以看到，当没有使用 destructuring 的时候，即使我只想获取一个成员，也必须键入`person`。很多多余的字符 :/

> 怎样在 C# 中使用呢？

```csharp
(var pname, var pcompany) = CreatePerson("chris", "microsoft")
```

> 好吧，看起来类似。`CreatePerson()` 返回的到底是什么呢？

在这种情况下，它返回一个对象，但也可能是一个元组。

> 这样就行了吗？

这取决于你正在处理什么结构。它目前适用于元组和类，尽管支持类的话你需要做一些额外的工作将它运行起来。

### Tuple - 元组

让我们首先通过元组来了解它的来龙去脉。首先创建一个可生成元组的方法。如下所示：

```csharp
public static (string, string) GetPerson(string name, string company)
{
    return (name, company);
}
```

我们可以通过两种方式进行此操作：

1. 从元组访问所有变量
2. 仅访问我们所需要的变量但是使用弃元符号 `_`

> 译者注：从 C# 7.0 开始，C# 支持弃元，用 `_` 表示。弃元相当于未赋值的变量，无需为该变量分配存储空间，所以可以减少内存分配。本质上来说这是一种人为取消使用的临时虚拟变量。参考[弃元](https://docs.microsoft.com/zh-cn/dotnet/csharp/discards)

让我们演示第一种情况：

**所有变量**

```csharp
var (name, company) = GetPerson("Chris", "Microsoft");
// name = "Chris"
// company = "Microsoft"
```

**使用弃元**

```csharp
var (name, _) = GetPerson("Chris", "Microsoft");
// name = "Chris"
```

在上面的例子中，我们使用 `_` 表示我们不关心元组中的第二个参数。

> 那么如果我们有3个或多个参数，他们是否都被储存在`_`里？

并不是。您需要声明每个参数，但我们不关心位置，因此可以像这样输入：

```csharp
var (name, _, _) = GetPerson("Chris", "Microsoft");
```

### Classes - 类

像元组一样，我们可以对类进行解构来访问特定的字段。为了实现这个目的，我们需要将一个 `Deconstruct()` 方法添加到类中，如下所示：

```csharp
public class Person 
{
    public string Name { get; set; }
    public string Company { get; set; }
    public string Country { get; set; }

    public void Deconstruct(out string name, out string company) 
    {
        name = Name;
        company = Company;
    }

    public void Deconstruct(out string name, out string company, out string country)
    {
        name = Name;
        company = Company;
        country = Country;
    }
}

// 用如下方式访问
(var name, var company) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

对于我们不关心的参数，可以使用同样的规则，即使用弃元 `_`，如下所示：

```csharp
(var name, var company, _) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

上面的例子中，我们丢弃了 `country`。

**重载解构方法**

您可能已经注意到在 `Person` 类中有两个 `Deconstruct()` 方法。这是因为我们使用了重载，所以可以有以下两种方式：

```csharp
(var name, var company, _) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

第二个示例：

```csharp
(var name, var company) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

在第二个示例中，我们实际上移除了弃元 `_`，因为我们正在使用带有两个参数的 `Deconstruct()` 方法。

> 但是，我什么时候需要弃元 `_` 呢？

在以下的例子中，你仅需要它的一个参数：

```csharp
(var name, _ ) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

这里我们在使用带有两个参数的 `Deconstruct()` 方法，但是丢弃了最后一个参数。

> 那么，我为什么不直接输入 `( var name )` 呢？

我只能告诉你它就是这样实现的。只要记住，如果使用重载，需要2个或更多参数来使用它。

要了解更多关于解构的内容，请阅读以下文档：

> https://docs.microsoft.com/en-us/dotnet/csharp/deconstruct

## -2- Pattern matching - 模式匹配

我在像 F# 的函数式语言中见过模式匹配。它的目的是什么？如果你问我的话，我会说这是为了减少输入并在真正要进行比较时更精确。在使用 Switch 的情况下，如何使这些更容易阅读和更有针对性。

> 请展示

好。当我过去使用 C# 时，switch 支持字符串、整数和枚举，仅此而已。当使用对象时 switch 并不合适，我需要使用 if、 else-if 来转换对象。让我们先展示一些代码：

```csharp
 public abstract class Character 
    {
      private string _name;
      public string Name 
      { 
        get {
            return _name;
        }
      }
      public Character(string name)
      {
          _name = name;
      }
    }
    public class Hero: Character 
    {
      public Hero(string name): base("The Good" + name){}
      public string Healing() 
      {
          return "Performs healing";
      }
    }
    public class Villain: Character 
    {
      public Villain(string name) : base("The Evil "+ name) { }

      public string Lightning()
      {
          return "Performs Force lightning";
      }
    }
```

现在假设我们有如下代码：

```csharp
var hero = new Hero("Luke");
var villain = new Villain("Darth Vader");
Character character = hero;
var ability = string.Empty;
```

现在，让我们加入一些我曾经在 C# 中用过的 switch 逻辑：

```csharp
if(character is Hero) 
{
  var h = (Hero) character;
  ability = h.Healing();
} else {
  var v = (Villain) character;
  ability = v.Lightning();
}
```

我们对这种用法满意吗？其实并不。好消息是，从 C# 7 起，我们可以这样做：

```csharp
switch(character) 
{
    case Hero hero1:
        ability = hero1.Healing();
        break;
    case Villain villain1:
        ability = villain1.Lightning();
        break;
}
```

在上面的示例中，我们根据条件创建了 `hero1` 或 `villain1` 对象。看起来少输入了一些代码。

让我们看一下在 C# 8.0 中怎么做：

```csharp
ability = character switch {
  Hero hero2 => hero2.Healing(),
  Villain villain2 => villain2.Lightning(),
  _ => "Unknown" 
};
```

> 这看起来真的不错，非常紧凑 :)

对吧？

### Positional pattern - 位置模式

C# 8 确实令人惊叹，或者至少对于我来说 :) 那么还有其他的吗？我们把它叫做位置模式。这种模式可以让我们检查一个对象，根据它对哪个属性设置的特定的值进行相应的处理。

假设我们有一个 Invoice 类。根据它的状态，我们可能要以不同的方式处理它，那么我们如何在给定的模式匹配中表示呢？

我们开始之前，先说一下我们将使用 *Destruction* 做到这一点。那么接下来是你可能感兴趣的东西。假设我们在一个 `Invoice` 类中有 `BossSigned` 和 `SkipLevelBossSigned` 属性。我们制定了一条业务规则，如果老板和更上级的老板已经签署发票，则可以继续处理。

- `BossSigned`, 值为 `null` 或签署的日期
- `SkipLevelBossSigned`, 值为 `null` 或签署的日期

```csharp
var result = invoice switch 
{
  Invoice (null, null) => "Boss need to sign",
  Invoice (_ , null) => "Skip level boss need to sign",
  _ => "All good, process"
}
```

### Property pattern - 属性模式


到目前为止，我们为 `Invoice` 的类型进行了匹配，但我们也可以不用关心类型，只需要匹配属性：

```csharp
var result = shape switch 
{
  { BossSigned: null, SkipLevelBossSigned: null } => "Boss need to sign",
  { SkipLevelBossSigned: null } => "Skip level boss need to sign",
  _ => "All good, process"
}
```

上面的示例其实有个潜在的风险，如果 `_` 具有 null 值它会匹配到默认的case。在生产环境中使用之前您可能需要修复该问题。

## -3- Records - 记录

这个特性还没有正式发布，但我感到很兴奋。简而言之，我们可以忘掉字段声明

> 你是认真的吗？那要用什么代替呢？看起来会是什么样子？

这个特性对我来说有点类似 Scala 和 TypeScript，它可以为您完成繁重的工作，即创建字段。在 TypeScript 中看起来像这样：

```csharp
class Hero {
  constructor(private name: String, private hp: number, public shout: String)
}
```

上面的示例中为您创建了 `name`，`hp` 和 `shout`。所以无需像这样输入：

```csharp
// the above would compile to this

class Hero {
  constructor(name: String, hp: number, shout: String) {
    this.name = name;
    this.hp = hp;
    this.shout = shout;
  }
}
```

> 作为 C# 开发人员，这看起来有点倒退，类型放在最后？

这让我想起了这个说法，但是的，就是这样 :)

[![img](https://res.cloudinary.com/practicaldev/image/fetch/s--_9aQ8vZY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/guwdo0osb696z2arkwc0.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--_9aQ8vZY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/guwdo0osb696z2arkwc0.jpg)

> 如果在 C# 实现将会是什么样？他们正在努力实现它，但提案应该是这样的：

```csharp
public class Hero(String name, int hp, String shout);
```

以上代码将会被编译成这样：

```csharp
public class Hero : IEquatable<Hero>
{
  public String name;
  public int hp;
  public String shout;
  public Hero(string name, int hp, string shout) 
  {
    this.name = name;
    this.hp = hp;
    this.shout = shout;
  }

  public bool Equals(Hero other)
  {
      //
  }

  public override bool Equals(object other)
  {
      //
  }

  public override int GetHashCode()
  {
      //
  }

  public void Deconstruct(out string name, out int hp, out string shout)
  {
      name = name;
      hp = hp;
      shout = shout;
  }

    public Hero With(string name = this.name, int age = this.age, string shout = this.shout) => new Hero(name, hp, shout);
}
```

所以，我们会得到很多额外的益处，如 Deconstruct、Equal，并且能使用新的语法 `With`。 `With` 也是一个新的东西，可以帮助我们创建新的不可变对象。我们能够像这样输入：

```csharp
var hero = GetHero(); // get a Hero object from somewhere
var newHero = hero.With(hp = 23);

// alt syntax
var otherHero = hero with { hp = 23 }; 
```

##  小结

这就是本文的结尾了。如果你像我一样重返 .NET 开发，也许有些感受是相同的或不同的，哦，对了还有 .NET Core，当然，这是个大新闻。能够在 Linux / Mac上运行 .NET，对代码进行容器化等等。谁会想到这一天真的来临？

坦白说，我会使用这些结构吗？我肯定会使用模式匹配，即使我在很多时候都采用继承并避免这种逻辑。

那么解构呢？对元组来说我会使用，无需额外的工作就可以使用它。那么对象呢？我看到我需要做以下两件事之一：

2. 在一个类上创建一个方法返回所需的元组
4. 在有必要的类上添加 `Deconstruct()` 方法。我会问自己以下问题：我是否需要将字段从类传递到外部环境？字段是否提供了实现细节？属性呢？我们还有包含很多公共字段的DTO对象，因此……

记录，我需要它们。迫不及待想看到它们的实现了 :)
