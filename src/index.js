import Preview from './Preview';
import Settings from './Settings';
import fs from 'fs';
const cmd = require('node-cmd');
const configKeywords = ['settings', 'configure', 'custom', 'command'];

export const fn = ({ term, display, actions }) => {
  /**
   * Load the json path, if it's expecified
   */
  var jsonPath = localStorage.getItem('jsonPath');

  var setPath = (path) => {
    /**
     * Using the localStorage to save the json path of the user
     */
    localStorage.setItem('jsonPath', path);
    jsonPath = path;
  }

  /**
   * Load the settings of the plugin
   */
  if (configKeywords.join('').includes(term.toLowerCase())) {
    display({
      title: 'Custom commands plugin settings',
      getPreview: () => <Settings exec={setPath} data={jsonPath} />
    })
  }

  /**
   * Get the JSON with the commands and parse
   */
  var _data;
  if (jsonPath) {
    _data = fs.readFileSync(jsonPath, 'utf-8');
  }
  else {
    _data = fs.readFileSync(process.env.APPDATA + '/cerebro-custom-command/config.json', 'utf-8');
  }

  var data = JSON.parse(_data);

  if (!data || data.commands.length === 0) return;

  data.commands.forEach(command => {
    /**
     * If the term in cerebro matches one of the keywords or the command name, 
     * then show the command
     */
    if (command.keywords && command.keywords.join('').toLowerCase().includes(term.toLowerCase())
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