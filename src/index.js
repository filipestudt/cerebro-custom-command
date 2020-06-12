import Preview from './Preview'

var fs = require('fs')
var cmd = require('node-cmd')

export const fn = ({ term, display, actions}) => {

  var exec = (command) => {
    cmd.run(command);
    actions.hideWindow();
  }

  var search = (searchTerm) => {
    fs.readFile(process.env.APPDATA + '/cerebro-plugin-commandmaker/config.json', 'utf-8', (err, data) => {
      let obj = JSON.parse(data);
      if (obj.commands.length > 0) {
        for (let command of obj.commands) {
          if ( command.keywords && command.keywords.join('').toLowerCase().includes(searchTerm.toLowerCase())
              || command.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            let icon = command.icon;
            display({
              icon,
              title: command.name,
              onSelect: () => exec(command.exec),
              getPreview: () => <Preview data={command.options || []} exec={exec} />
            })
          }          
        }
      }
    });
  }

  search(term);
}