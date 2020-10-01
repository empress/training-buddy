'use strict';

const StaticSiteJson = require('broccoli-static-site-json');
const walkSync = require('walk-sync');
const { join } = require('path');

module.exports = {
  name: require('./package').name,

  config(env, config) {
    let blog = config.blog || {};

    let emberMetaConfig = {
      description: blog.description,
      imgSrc: blog.rssLogo || blog.logo,
      siteName: blog.title,
      title: blog.title,
      twitterUsername: blog.twitter,
    }

    if(blog.host) {
      if(blog.host.endsWith('/')) {
        emberMetaConfig.url = `${blog.host}/`
      } else {
        emberMetaConfig.url = blog.host;
      }
    }

    return {
      'ember-meta': emberMetaConfig,
      blog: {},
      fastboot: {
        hostWhitelist: [/localhost:\d+/]
      },
    }
  },

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    let appPrefix = join(this.project.configPath(), '../..');

    return new StaticSiteJson(join(appPrefix, 'content'), {
      type: 'step',
      contentFolder: `steps`,
      attributes: [
        'title',
        'order',
      ],
      collections: [{
        output: `all.json`,
      }],
    });
  },

  urlsForPrember() {
    let appPrefix = join(this.project.configPath(), '../..');

    const content = walkSync(join(appPrefix, 'content'), {
      globs: ['**/*.md'],
    });

    const staticUrls = ['/'];

    const contentUrls = content.map(file => file.replace(/\.md$/, ''));

    return [...staticUrls, ...contentUrls];
  },
};
