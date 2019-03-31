/* eslint-env node */
const recast = require('recast');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const stringUtils = require('ember-cli-string-utils');

module.exports = {
  description: 'The default blueprint for empress-blog.',

  normalizeEntityName() {
    // no-op
  },

  fileMapTokens: function() {
    let isAddon = this.project.isEmberCLIAddon();
    return {
      __base__() {
        if(isAddon) {
          return path.join('tests', 'dummy');
        }
        return '';
      }
    }
  },

  locals: function(options) {
    let packageName = options.project.name();
    let dasherizedPackageName = stringUtils.dasherize(packageName);

    if(options.project.isEmberCLIAddon()) {
      dasherizedPackageName = 'dummy';
    }

    return {
      dasherizedPackageName,
    };
  },

  afterInstall() {

    let devInstall = {
      packages: [
        'prember',
        'ember-cli-fastboot',
      ]
    }


    return this.addAddonsToProject(devInstall).then(() => {
      const builders = recast.types.builders;

      const code = readFileSync('./ember-cli-build.js');
      const ast = recast.parse(code);

      recast.visit(ast, {
        visitNewExpression: function (path) {
          var node = path.node;

          if (node.callee.name === 'EmberApp'
              || node.callee.name === 'EmberAddon') {
            // console.log(node, node.arguments)
            const configNode = node.arguments.find(element => element.type === 'ObjectExpression');

            let fingerprint = configNode.properties.find(property => property.key.value === 'fingerprint');

            if(!fingerprint) {
              fingerprint = builders.property(
                'init',
                builders.identifier('fingerprint'),
                builders.objectExpression([])
              )
              configNode.properties.push(fingerprint);
            }

            // remove extensions from
            const properties = fingerprint.value.properties.filter(property => property.key.value !== 'extensions');

            properties.push(recast.types.builders.property(
              'init',
              builders.identifier('extensions'),
              builders.arrayPattern([
                builders.literal('js'),
                builders.literal('css'),
                builders.literal('map'),
              ])
            ));

            fingerprint.value.properties = properties;

            return false;
          } else {
            this.traverse(path);
          }
        }
      });

      writeFileSync('./ember-cli-build.js', recast.print(ast, { tabWidth: 2, quote: 'single' }).code);

      let configFile = './config/environment.js'

      if(this.project.isEmberCLIAddon()) {
        configFile = './tests/dummy/config/environment.js';
      }

      const config = readFileSync(configFile);
      const configAst = recast.parse(config);

      recast.visit(configAst, {
        visitVariableDeclaration: function (path) {
          var node = path.node;

          const env = node.declarations.find(declaration => declaration.id.name === 'ENV');

          if (env) {
            let trainingBuddy = env.init.properties.find(property => property.key.value === 'trainingBuddy');

            if(!trainingBuddy) {
              trainingBuddy = builders.property(
                'init',
                builders.identifier('trainingBuddy'),
                builders.objectExpression([
                  builders.property('init', builders.identifier('title'), builders.literal('Traning Buddy: Demo')),
                  builders.property('init', builders.identifier('logo'), builders.literal('/images/teaching-tomster.png')),
                  builders.property('init', builders.identifier('coverImage'), builders.literal('/images/intro-header.jpg')),
                ])
              )
              env.init.properties.push(trainingBuddy);
            }

            return false;
          }

          this.traverse(path);
        }
      });

      writeFileSync(configFile, recast.print(configAst, { tabWidth: 2, quote: 'single' }).code);
    });
  },

  filesToRemove: ['app/templates/application.hbs'],
};
