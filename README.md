### [Visit the webring](https://mohawk-college-webring.vercel.app/)

# Please read this before opening a pull request to join!

## What is a Webring?

A webring is a collection of websites linked together in a circular structure. By joining this webring, you integrate your site into a continuous loop with fellow Mohawk College peers. This allows users to organically discover and filter student portfolio sites, fostering a stronger developer community.

## How to Join

To add your website to the webring, you must submit a pull request to this repository. Please follow these rules to ensure your submission is processed smoothly and quickly:

### 1. Modify the Members List

All members are tracked within the `members.json` file.

- **Placement:** You **must** add your member object to the **absolute end** of the JSON array. This ensures that the validation scripts run smoothly, and the navigation acts as a webring should.
- **Valid JSON:** Double-check that you do not break the overall JSON syntax (e.g. watch out for missing/unnecessary commas or unclosed brackets).

### 2. Include Required Fields

Your member object must include the following valid properties. Be sure that the values for your properties match the type definitions found in `webring/src/types.ts`

- `name`: Your full name or preferred name.
- `url`: The direct link to your personal website or portfolio.
- `jobStatus`: Your current employment or search status.
- `graduationYear`: The year you graduated or expect to graduate.
- `tags`: An array of strings representing the technologies you work with/are most familiar with.

### 3. Match the Strict Type Definitions

To maintain consistent filtering on the front end, your data must align with the definitions in the codebase.

- **Job & Year:** Your `jobStatus` and `graduationYear` properties must match the exact strings/numbers allowed in `webring/src/types.ts`.
- **Tech Tags:** All technologies listed in your `tags` property must exist exactly as written in the `techFiltersArray` located inside `webring/src/types.ts`.

### 4. Adding New Filter Tags (If Applicable)

If you need to introduce a new technology tag or a graduation year that is not currently listed, you are absolutely encouraged to do so. However, you must also modify `webring/src/types.ts` to add your new tag to the `techFiltersArray` or the relevant type unions as part of your pull request.

### 5. Getting/Providing Feedback

You may optionally add an `email` property to your member object.

- **Opting In:** By including your email, you are opting in to receive an automated notification whenever a new member is added to the webring. The purpose of this is to allow established members to visit new portfolios and provide constructive feedback to the student.
- **Opting Out:** If you wish to stop receiving these emails in the future, you can open a new pull request to remove the `email` property from your object, or contact a repository maintainer to do it for you in the next commit.

### 6. Add the Widget to Your Site

For the webring to function, you should provide the "Next" and "Previous" navigation links on your portfolio, and ideally a link to the webring landing page itself.

Below is what you need to get started. Copy and paste both the HTML and CSS into your website. Make sure to replace the parameter in the "?from=" query with your actual website URL.

#### HTML

```html
<a
  href="https://mohawk-college-webring.vercel.app/api/previous?from=https://YOUR WEBSITE URL HERE"
>
  <div class="left-arrow"></div>
</a>

<a href="https://mohawk-college-webring.vercel.app"
  ><div class="webring-logo"></div
></a>

<a
  href="https://mohawk-college-webring.vercel.app/api/next?from=https://YOUR WEBSITE URL HERE"
>
  <div class="right-arrow"></div>
</a>
```

#### CSS

```css
.webring-logo {
  width: 60px;
  height: 60px;

  /* You can do whatever color you like for the logo. CSS magic!*/
  background-color: white;

  -webkit-mask-image: url("https://mohawk-college-webring.vercel.app/logo.svg");
  mask-image: url("https://mohawk-college-webring.vercel.app/logo.svg");

  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}
.left-arrow {
  width: 60px;
  height: 60px;

  /* You can do whatever color you like for the arrows. CSS magic!*/
  background-color: white;

  -webkit-mask-image: url("https://mohawk-college-webring.vercel.app/leftArrow.svg");
  mask-image: url("https://mohawk-college-webring.vercel.app/leftArrow.svg");

  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}
.right-arrow {
  width: 60px;
  height: 60px;

  /* You can do whatever color you like for the arrows. CSS magic!*/
  background-color: white;

  -webkit-mask-image: url("https://mohawk-college-webring.vercel.app/rightArrow.svg");
  mask-image: url("https://mohawk-college-webring.vercel.app/rightArrow.svg");

  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}
```

#### Credits to Habib Abdul for the logo
