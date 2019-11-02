Given an array of objects that define a person’s name and their skills, write a javascript function that takes the given array and returns and object that maps each skill to an array of people that has that skill.

For example:
```
[
  {
    id: 0,
    name: "John",
    skills: ["javascript", "html", "css", "c#"]
  },
  {
    id: 1,
    name: "Brian",
    skills: ["javascript", "java", "c", "c#", "c++", "html"]
  },
  {
    id: 2,
    name: "Michael",
    skills: ["c", "c++", "go", "rust"]
  }
];
```

Expected result:

```
{
  "c": ["Brian", "Michael"],
  "c#": ["John", "Brian"],
  "c++": ["Brian", "Michael"],
  "css": ["John"],
  "go": ["Michael"],
  "html": ["John", "Brian"],
  "java": ["Brian"],
  "javascript": ["John", "Brian"],
  "rust": ["Michael"]
};
```
