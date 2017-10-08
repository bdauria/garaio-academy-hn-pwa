var path = require('path');
var moduleAlias = require('module-alias');

moduleAlias.addAliases({
  react: 'preact-compat/dist/preact-compat.min',
  'react-dom': 'preact-compat/dist/preact-compat.min',
  'create-react-class': path.resolve(__dirname, './create-preact-class')
});
