---
type: post
status: new
title: 'The Secret Art of Debugging'
description: 'Generic piece about approaching debugging that is relevant for any language or platform.'
tags: ['Debug', 'Debuging']
author: 'Jeremy Likness'
date: 2020-01-24
url: 'https://dev.to/dotnet/the-secret-art-of-debugging-1lfi'
translator: ''
---

# The Secret Art of Debugging

<ContentMeta />

Mastery of the art of debugging is rare. I know this from years of experience working on enterprise systems. If it was simple, more people would be doing it and everyone would be able to track down bugs. The reality is that most shops have that one "go to person" known as "The Exterminator" who is called in to sweep the place for those bugs no one else was able to track down. I've worked for product companies and consulting firms and in both roles, a significant part of our business revolved around finding nasty bugs 🐜 and fixing them.

I believe troubleshooting is a skill that can be taught, learned, and mastered. Unfortunately, too many people focus on tools and language features instead of a mental framework that will work regardless of language, platform, or tool. Interested in learning the secret to solving code on the fly? Read on!

I've been working on bug fixes for decades now. One of my first feature articles published in print was a troubleshooting piece called "The Exterminator's Code" that ran in a magazine called "News/400" back in 1999. One thing I've found is that effective bug hunting involves a combination of skills. It's not enough to know the technology. There is a method to the madness. There are certain steps that can be learned, and as you encounter more systems during your career, experience only adds to the mix. 

What has always amazed me is the gap between those who are good at finding defects and those who aren't. You'd think it would be a continuous spectrum of skills but what I've found is either people get it, or they don't - the ones who do, do it quickly and consistently. So what is the secret?

# Train Your Eyes 👀

Do me a favor and take a quick pop quiz. Read the quote below and quickly count the number of F's in the passage.

> **Finished files are the result**
> **of years of scientific study**
> **combined with the experience**
> **of years.**

I'll come back to the answer for that in a second. It would be too easy if I put it there. Just note down what you thought it was, and then let's take something a little more involved. Here's another set of instructions, and trust me, this is all leading up to something. Are you ready for another contest?

I want you to watch a very short video. The video has some instructions to follow. Just let it play through once. Don't try to pause or fast forward. [Here is the link](https://youtu.be/vJG698U2Mvo) or you can press play on the video below. Go ahead and watch it, then write down your score (you'll understand).



By now I hope you are starting to see my point, and the first step to mastering the art of debugging. In my experience, the majority of developers don't debug code the right way. When they hit F5 and start stepping through the program, they're not watching what is going on.

What? Am I kidding? They've got break points set. There are watch windows. They are dutifully hammering F10 and F11 to step into and out of subroutines. What do I mean? Here's the problem:

They are waiting for the program to do what they expect it to do. And it's hard not to, especially when you are the one who wrote the program! So when you step through that block of code and go, "Yeah, yeah, I'm just initializing some variables here" and quickly hit F10, you've just missed it because that one string literal was spelled incorrectly or you referenced the wrong constant.

The answer to the "F" quiz is 6. Most people count 3 because they sound the words in their head and listen for the "f" sound, rather than just looking at the letters. And that's what people do when they debug - they feel out the program, rather than watching what it is really doing.

# Seriously: Train Your Eyes 👁👁

Did you see the gorilla? Most people won't their first time. It's because they are following instructions. They are counting passes, which is exactly what the exercise was about. But can you believe how obvious it is when you see it and know what you're looking for? How could you miss something like that?

Hopefully by now we've established that your mind has a pretty good filter and is going to try to give you what you want. So when you step through code with expectations, guess what? You'll see the debugger doing what you expect, and miss out on what is really happening that may be causing the bug.

# But How? ¯\*(ツ)*/¯

There are several things you can do to help hone your debug skills, and I encourage you to try these all out.

Have someone else debug your code, and offer to debug theirs. The best way to understand how to look at code and see what it is doing is to step through code you're not familiar with. It may seem tedious at first, but it's a discipline and skill that can help you learn how to walk through the code the right way and not make any assumptions.

Try not to take in the code as blocks. In other words, when you have a routine that is initializing variables, don't step over it as the "block of initialization stuff." Step through and consider each statement. Don't look at the statements as sentences, but get back to your programming roots and see a set of symbols to the left of the equal sign and a set of symbols to the right of the equal sign. You'll be surprised how this can help you hone in quickly to a wrong or duplicate assignment. It's common in MVVM, for example, for developers to cut and paste and end up with code like this:

```
private string _lastName; 
private string _firstName; 

public string FirstName 
{
   get { return _firstName; }
   set { _firstName = value; RaisePropertyChanged(()=>FirstName); }
}

public string LastName 
{
   get { return _firstName; }
   set { _lastName = value; RaisePropertyChanged(()=>LastName); }
}
```

Did you spot the bug? If not, take some time and you will. This is far more difficult when it's code you've written because that expectation is there for it to "just work."

# Get Back to the Basics 🔎

With all of the fancy tools that tell us how to refactor code and scan classes for us, sometimes we forget about the basic tools we have to troubleshoot.
I was working with a client troubleshooting a memory leak issue and found myself starting at huge graphs of dependencies, handles, and instances. I could see certain objects were being created too many times, but looking at the code, it just looked right. Where were the other things coming from?

So, I got back to the basics. I put a debug statement in the constructor and ran it again. Suddenly I realized that some of the instances were faithfully reporting themselves, and others weren't. How on earth? *Ahhh*... the class was derived from a base class. So I put another debug statement in the base class. Sure enough, it was getting instanced as well. A quick dump of the call stack and the problem was resolved... not by graphs and charts and refactoring tools, but good old detective work.

# Don't Trust the Documentation 🔐

One lesson I learned early on is to not trust the documentation. I was writing a book about a new framework that was in development. The documentation was sparse, in flux, and often wrong. In one particular section I was writing about how certain applications should behave. The documentation was very specific about how the work would be partitioned into various threads. My mentor said, "Don't trust it" and encouraged me to debug instead. In stepping through the code and watching what actually happened, rather than what I expected to happen, I learned the architecture was very different. I was able to help fix the documentation and help developers avoid unnecessary overhead in their code.

I constantly build small projects to learn languages and platforms. For example, consider the following JavaScript:

```javascript
const doSomething = (payload, fn) => { fn(payload); };

doSomething('This should echo', console.log);

let text = 'Some text'; 
doSomething(text, text => text += ' appended to.');
console.log(`The text after the call: ${text}`);

let textPayload = { text }; 
doSomething(textPayload, payload => payload.text += ' appended to.');
console.log(`The text after the payload call: ${textPayload.text}`);  
```

Can you predict what will be written to the console? You can verify your answer by running [this jsFiddle](https://jsfiddle.net/jeremylikness/3jnnv1sa/).

It is a simple bit of code, but helped me move beyond conceptualizing how primitives and objects differ in JavaScript to see them hands-on and in action. 

# Practice Makes Perfect 🏌️‍♂️🏌️‍♀️

I often debug code that is working fine. I frequently find potential issues that don't have immediately obvious side effects. I might notice that initialization code is being called more than once (this could result in performance issues at scale) or that an event is registered by an instance that goes out of scope without unregistering. This could result in a memory leak!

Sometimes even "simple code" can reveal secrets when you step away from your assumptions. I worked on some the largest projects written in Angular.js (yes, the *old* version that required `$scope` or `controller as`). Some very simple pages that used data-binding had a lot going on "behind the scenes." By debugging these pages I'd discover inefficiencies such as running multiple "digest loops" that could impact performance over time.

A great exercise is to download an open source project, preferably a utility or tool. Spend some time reviewing the source code to determine how you think the code will behave. Then, fire up the debugger and step through each statement. Leave no stone unturned! You may be surprised at what you find and learn. The more often you do this, the better prepared you become. You will:

1. Learn how to analyze code by previewing its source
2. Discover patterns developers use to address various problems
3. Potentially uncover issues that the author(s) was/were not aware of

This exercise may just uncover an improvement you can make and submit as an open source contribution back to the project.

# The Best Debug Tool is Your Mind 🧠

Finally, I'm going to give you the same advice my mentor gave me so many years ago when I started troubleshooting my first enterprise issues. He told me the goal should be to never have to fire up the debugger. Every debugging session should start with a logical walkthrough of the code. You should analyze what you expect it to, and walk through it virtually... *if I pass this here, I'll get that, and then that goes there, and this will loop like that*... this exercise will do more than help you comprehend the code. Nine times out of ten I squash bugs by walking through source code and never have to hit F5.

When I do hit F5, I now have an expectation of what the code should do. When it does something different, it's often far easier to pinpoint where the plan went wrong and how the executing code went off script. This skill is especially important in many production environments that don't allow you to run the debugger at all. I was taught and have since followed the philosophy that the combination of source code, well placed trace statements and deep thought are all that are needed to fix even the ugliest of bugs.

It's easy to fire up the debugger and set a breakpoint where you *think* the defect might be. In crunch times, that may be the best approach and if you succeed, a hat 🎩 tip to you! If not, however, don't get caught in the trap of believing your assumptions. Instead, take a step back and start analyzing what's *really going on* rather than *what you think should be happening*. 

My flow typically looks like this:

1. Try to fix what I think the problem is (bonus if I can write a unit test that fails because of the defect, and passes when I fix it)
2. If not, take a step back and analyze the code to determine what it really is doing
3. Open the debugger, but instead of setting a breakpoint where I think the problem might be, go step-by-step from the beginning and note what is happening, not what I assume should happen
4. Add debug statements to help leave a breadcrumb trail
5. Pull out code in isolation to see if the defect can be located without the complexity and overhead of the full solution

I've been doing this long enough that I hit the solution at the first step 80% of the time, and end up spending the extra time for the last few steps 20% of the time.

# It's an Art you *CAN* Learn

Debugging is an art that can be learned with patience, focus, and experience. I hope the earlier exercises helped you understand the filters that sometimes block your efforts to fix code, and that these tips will help you think differently the next time you are faced with an issue. Remember, there is no defect that can't be fixed... and no debugger more powerful than the one between your ears.

What is your favorite debugging tip? Please share using the comments below.

