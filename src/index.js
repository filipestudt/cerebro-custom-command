import Preview from './Preview'
import fs from 'fs'

var cmd = require('node-cmd')

export const fn = ({ term, display, actions}) => {
  /**
   * Get the JSON with the commands and parse
   */
  let _data = fs.readFileSync(process.env.APPDATA + '/cerebro-plugin-commandmaker/config.json', 'utf-8');
  var data = JSON.parse(_data);

  if (!data || data.commands.length === 0) return;
  
  data.commands.forEach(command => {
    /**
     * If the term in cerebro matches one of the keywords or the command name, 
     * then show the command
     */
    if ( command.keywords && command.keywords.join('').toLowerCase().includes(term.toLowerCase())
          || command.name.toLowerCase().includes(term.toLowerCase())) {      
      let icon = command.icon;
      /**
       * The preview will load the others options of commands to execute,
       * if it's expecified on the .json file
       */
      display({
        icon,
        title: command.name,
        onSelect: () => exec(command.exec),
        getPreview: () => <Preview data={command.options || []} exec={exec} />
      })    
    }
  });

  /**
   * 
   * @param {String} command 
   * Will be executed when selected a command
   */
  var exec = (command) => {
    cmd.run(command);
    actions.hideWindow();
  }
}