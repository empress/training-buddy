---
title: Step 2 - Syntax Highlighting
order: 2
---

You can write code blocks that will highlight your code in all of the common languages 🎉  There are even some custom things that you can do which are specifically designed for training-buddy. For example, you can define a `data-filename` in the code sample that will add a banner to the top of the sample and show the location of the file. This is useful if your students may be confused where the content should go.

```handlebars {data-filename=app/templates/create.hbs}
{{create-rental}}
```

You can also define a step for the code sample:

```handlebars {data-filename=app/templates/create.hbs data-step=2.1}
{{create-rental}}
```

This is useful if you want to be able to refer to "we are talking about step 2.2" when in the middle of a training, making it 100% clear what you're talking about to your students.

There is one last feature that can be used if you think it is useful. You can define a `data-repo` key to be set to either `frontend` or `backend`. This is useful if you're giving a training where some of the steps need to be made in a backend code repo or in a frontend code repo, and it will change the colour of the header, again adding a tiny bit to the clarity for students:

```handlebars {data-filename=app/templates/application.hbs data-repo=frontend data-step=2.3}
<div class="container">
  <div class="menu">
    {{#link-to 'index'}}
      <h1>
        <em>SuperRentals</em>
      </h1>
    {{/link-to}}
</div>
```

```javascript {data-filename=server/routes/v1/rental.js data-repo=backend data-step=2.4}
const autorouteJson = require('express-autoroute-json');
const { models } = require('../../../models');

module.exports.autoroute = autorouteJson({
  model: models.rental,
  resource: 'rental', // this will be pluralised in the routes

  // default CRUD
  find: {},
  create: {},
  update: {},
  delete: {},
});
```

**Note:** you  can't start or end a step with a code sample because of a bug with the rendering engine 😔 we are trying to fix it and hopefully it won't be like this forever
