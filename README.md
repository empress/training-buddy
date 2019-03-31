training-buddy
==============================================================================

Training Buddy an implementation of a "sidecar app" to be used during live-trainings. It was originally built by [Julia Donaldson](https://twitter.com/username_juliad) and [Chris Manson](https://twitter.com/real_ate) as a standalone Ember application to support the [App Building: 0 to MVP in 3 Hours! workshop](https://2018.emberconf.com/schedule.html#g-app-building-0-to-mvp-in-3-hours) at EmberConf 2018.

You can use this project to generate your own live-training sidecar application. We leverage [Empress](https://github.com/empress/) to produce a static site that can be hosted on Netlify, AWS S3 or any other static site hosting solution.

This system is designed to have a core functionality provided by this repository/package and separate packages that provide the themes and styling to your Training Buddy application.

- [Training Buddy Default Template](https://github.com/empress/training-buddy-default-template) is the original for Training Buddy theme that is intended to provide a default style for new projects.

If you are interested in writing your own theme for Training Buddy please reach out to us and we can walk you through the process. Hopefully if there is enough interest we can provide basic instructions on how to build your own theme using this system.

You do not need to be a web developer to be able to use this system. You just write markdown files and the rest of the work is performed by the EmberJS build system.


Quick Start
------------------------------------------------------------------------------

```sh
npm init ember-app my-awesome-training

cd my-awesome-training

npx ember install training-buddy training-buddy-default-template
```

It will ask you if you want to update the `index.html` file and you should say yes 👍

If you want to see the Training Buddy app running on your local machine just run `npm start` and you will
be able to navigate to  [http://localhost:4200](http://localhost:4200) to see the app in action.

**Note:** you need `npm@6.1` or later run this quick start. You can update with `npm install -g npm@latest` or check the [official docs](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)

Configuration
------------------------------------------------------------------------------

After you install Training Buddy using the instructions above, you will see that your `config/environment.js` file will have been edited to add a `trainingBuddy` config object. You should update this with the details relevant to your Training Buddy use case.

Here is the example config that is auto-generated for you with comments to explain the use of each of the attributes:

```javascript
trainingBuddy: {
  // This title will be used for the header of the introduction page that you see when you open the app
  // so you should probably set it to be the title of your training
  title: 'Traning Buddy: Demo',
  // the intro page can have a custom header (depending on the theme) as it is essentially the landing
  // page for your application. If you specify a logo or a coverImage it should show the header
  logo: '/images/teaching-tomster.png',
  // the coverImage should be used for the background image of the landing page header (depending on the
  // theme)
  coverImage: '/images/intro-header.jpg',
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
