---
type: post
status: new
sidebar: auto
title: "Great new features in C# for a returning .NET dev"
description: "this describes 3 great features in the C# language"
tags: ['C#', '.NET']
author: 'Chris Noring'
date: 2020-03-04
url: 'https://docs.microsoft.com/en-us/azure/devops/pipelines/apps/aspnet/build-aspnet-4'
translator: ''
reviewer: ''
pub_date: 
---

# Great new features in C# for a returning .NET dev

<ContentMeta />

Follow me on [Twitter](https://twitter.com/chris_noring), happy to take your suggestions on topics or improvements /Chris

> So I've been out of the loop for a while. I've actually been coding full-stack JavaScript and upon returning to .NET I've noticed there have been a few amazing additions to C# language, features that I recognize from JavaScript and Functional languages. That makes me super happy as it means C# is able to pick the raisins from different paradigms and most importantly evolve and become better and better. Additionally seeing .NET Core become faster and better doesn't hurt either ;) .NET working on all platforms, who would have thought that at the beginning of 2000? :)
>
> So what are these features?

## References

- [Deconstructing, Tuples and Objects](https://docs.microsoft.com/en-us/dotnet/csharp/deconstruct?wt.mc_id=devto-blog-chnoring) This covers how to do Deconstructing for Tuples and Objects. It goes through everything you need to know
- [Pattern matching .NET 8.0](https://docs.microsoft.com/en-us/archive/msdn-magazine/2019/may/csharp-8-0-pattern-matching-in-csharp-8-0?wt.mc_id=devto-blog-chnoring) With .NET 8.0 came some updates to Pattern Matching that was added in C# 7.0
- [Pattern matching in general](https://docs.microsoft.com/en-us/dotnet/csharp/pattern-matching?wt.mc_id=devto-blog-chnoring) This covers the different types of pattern matching that exists.
- [Records - the future isn't here yet, but here's a peek](https://blog.cdemi.io/whats-coming-in-c-8-0-records/)

## -1- Deconstruction

This is one feature I've come to love from JavaScript, of course in JavaScript it is called destructuring. So what's the idea? The idea is that you want to refer to a few properties on an object or items in a list but you really don't want to all of it. Let's look at a JS example:

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

As you can see in the above I have to type `person` as soon as I just want to talk to a member. A lot of extra characters :/

> How does this look in C# then?

```csharp
(var pname, var pcompany) = CreatePerson("chris", "microsoft")
```

> Ok, looks similar. What exactly does `CreatePerson()` give back to me?

In this case, it gives back an Object, but it could also be a Tuple.

> Ok so this just works or?

Well, depends on what structure you are working on. It works currently on Tuples and Classes, albeit with Classes you need to do a little extra work to get it up and running.

### Tuples

Let's go through Tuples first so we understand the ins and outs of it. Let's first create a method that produces a Tuple. Like so:

```csharp
public static (string, string) GetPerson(string name, string company) 
{
    return (name, company);
}
```

There are two ways we can go about this:

1. ask for all variables from our tuple
2. ask for as many as we want but use a throwaway character `_`

Let's demonstrate the first case:

**All variables**

```csharp
var (name, company) = GetPerson("Chris", "Microsoft");
// name = "Chris"
// company = "Microsoft"
```

**Discard case**

```csharp
var (name, _) = GetPerson("Chris", "Microsoft");
// name = "Chris"
```

Above we are using `_` to denote that we don't care about the second parameter in the Tuple. 

> What about if we have 3 or more parameters, would they all just be stored in `_`?

Well no. You would need to declare for each position it's a position we don't care about so that would mean we would type like this:

```csharp
var (name, _, _) = GetPerson("Chris", "Microsoft");
```

### Classes

We can do Destruct on classes as well and access specific fields just like we do with Tuples. To accomplish that we need however to add a `Deconstruct()` method to the class, like so:

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

// and access like so
(var name, var company) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

The same rule applies here when it comes to positions we are not interested in, i.e use the `_` like so:

```csharp
(var name, var company, _) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

Above we are saying we are discarding `country`.

**Overloading Deconstruct**

You might have noticed how we in our class `Person` have two `Deconstruct()` methods. It's because we are overloading and this gives us the ability two write the following:

```csharp
(var name, var company, _) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

like so:

```csharp
(var name, var company) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

Above we are actually removing our discard, `_`, because we are now using the `Deconstruct()` with two params. 

> But wait, when do I need the discard, `_` then?

You need it for one parameter, in the following case:

```csharp
(var name, _ ) = new Person(){ Name = "Chris", Company ="Microsoft" };
```

Above we are targeting the `Deconstruct()` with two parameters while discarding the last param.

> So why can't I just type `( var name )`

It's implemented that way, what can I tell ya. Just remember, if using overloading, use 2 or more params to make use of it. 

To learn more about Deconstruct have a read here:

> https://docs.microsoft.com/en-us/dotnet/csharp/deconstruct

## -2- Pattern matching

Pattern matching is something I've seen in functional languages like F#. So what's its purpose? Well if you ask me it's to type less and be more precise in what you actually want to be compared. So what are we talking about, really? Switch-case and how to make those easier to read and more purposeful. 

> Show me, please

Ok. So I came from a past when C# supported switch case on string, integers, and enums, that was it. Forget about using it on objects, then I would need to do if, else-if and cast the object, etc. Let's show some code so we are on the same page:

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

Now imagine we have some code like this:

```csharp
var hero = new Hero("Luke");
var villain = new Villain("Darth Vader");
Character character = hero;
var ability = string.Empty;
```

Let's now add some switching logic to this from the C# I used to remember:

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

Are we happy about this? No not really. Good news though, per C# 7 we got the ability to do this:

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

Above we are creating the object `hero1` or `villain1` depending on our case. That's a little less to type.

Hold my beer, let's do C# 8.0 :)

```csharp
ability = character switch {
  Hero hero2 => hero2.Healing(),
  Villain villain2 => villain2.Lightning(),
  _ => "Unknown" 
};
```

> That looks really nice and compact :)

Right?

### Positional pattern

We were just wow-ed by C# 8, or at least I was :) So what else do we have? We call it the positional pattern. This pattern gives us the ability to inspect an object and depending on what properties it has set a certain way we can act accordingly.

Imagine that we have an invoice. Depending on what state it's in we might want to treat it differently, so how do we express this in a switch-case given pattern matching?

Well before we do that let's first say that we will use *Destruction* to do this. Then the next interesting questions become, what values could be of interest. Let's assume we have the following properties on an `Invoice` class `BossSigned`, `SkipLevelBossSigned`. We make up a business rule that says if the boss and the boss above have signed the Invoice can be processed.

- `BossSigned`, has the value `null` or the date it was signed
- `SkipLevelBossSigned`, has the value `null` or the date it was signed

```csharp
var result = invoice switch 
{
  Invoice (null, null) => "Boss need to sign",
  Invoice (_ , null) => "Skip level boss need to sign",
  _ => "All good, process"
}
```

### Property pattern

So far we matched on type `Invoice` but we can also throw something at it where we don't care about type, just the shape

```csharp
var result = shape switch 
{
  { BossSigned: null, SkipLevelBossSigned: null } => "Boss need to sign",
  { SkipLevelBossSigned: null } => "Skip level boss need to sign",
  _ => "All good, process"
}
```

The above has a risk though, it will hit the default case if `_` has the value null. You might want to fix the code before going to production.

## -3- Records

This is something that hasn't landed yet but oh boy am I excited about it. What is it? Well, in short, forget about field declarations

> Are you serious? What would I get instead and how would that look?

Ok, so this for me comes from Scala and Typescript, the ability to have heavy lifting done for you, namely the creation of fields. It looks like so in TypeScript:

```csharp
class Hero {
  constructor(private name: String, private hp: number, public shout: String)
}
```

The idea above is to have the fields `name`, `hp` and `shout` created for you. So you wouldn't have to type them out like so:

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

> As a C# developer, this looks a little backward, with the type last?

It reminds me of this meme, but yea it's just the way it is :)

[![img](https://res.cloudinary.com/practicaldev/image/fetch/s--_9aQ8vZY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/guwdo0osb696z2arkwc0.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--_9aQ8vZY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/guwdo0osb696z2arkwc0.jpg)

> How would that look once implemented in C#? Well they are working on it but the proposal should look like this:

```csharp
public class Hero(String name, int hp, String shout);
```

which would compile into this:

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

So we would get a lot extra like Deconstruct, Equal and using this new syntax `With`. `With` is a new thing too that helps us create new immutable objects. It would allow us to type like this:

```csharp
var hero = GetHero(); // get a Hero object from somewhere
var newHero = hero.With(hp = 23)

// alt syntax
var otherHero = hero with { hp = 23 }; 
```

##  Summary

This is the end of this article. If you are like me coming back to .NET it's the same but different and oh yes .NET Core, of course, is a huge bit of news. Being able to run .NET on Linux/Mac, containerize your code and more. Who thought that day would ever come?

So confession time, would I use these constructs? I would definitely use the pattern matching, even if I would resort to inheritance a lot of the time and avoid this kind of logic. 

What about Deconstruct? I mean with Tuples yes, there is no extra effort needed to just have it work. For Objects? I see myself doing one of two things:

1. Create a method on a class that returns a Tuple of what I need
2. Yes, add `Deconstruct()` method on classes where it makes sense. I would ask myself the following though: should I pass fields from a class to some outer context. Aren't fields an implementation detail? But what about properties? Well we have Data Transfer Objects with a lot of public fields, so there

Records, I need them in my life. Can't wait for them to finish implementing :)