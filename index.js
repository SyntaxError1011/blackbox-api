const fs = require("fs");
const path = require("path");
const axios = require("axios");
//const login = require("fca-horizon-remastered");
const login = require('node-ainzfb-new');
const cron = require("node-cron");
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const { message, logger } = require("./utils/log.js");
var prefix = config.prefix,
  name = config.name,
    option = config.setOpt;
    global.bot = new Object({
      prefix: prefix,
        name: name
        });

        //auto restart
        setInterval(() => {
          process.exit();
          }, 30 * 60 * 1000);
          //==========//

          login({ appState: JSON.parse(process.env.token) }, (err, api) => {
            console.clear();
              logger("INSTALLING COMMANDS");
                const command = path.join("scripts", "commands");
                  for (let files of fs.readdirSync(command)) {
                      if (files.endsWith(".js")) {
                            try {
                                    if (!files.endsWith(".js"))
                                              return warn("Command Error: File Extension Error");
                                                      logger("Installed command: " + files);
                                                            } catch (e) {
                                                                    warn("Can't install command: " + files + "\nReason: " + e);
                                                                          }
                                                                              }
                                                                                }
                                                                                  logger("SUCCESSFULLY INSTALLED COMMANDS");
                                                                                    if (err) return console.log(err);
                                                                                      api.setOptions(option);

                                                                                        api.listenMqtt(async function(err, event) {
                                                                                            //ðŸœ
                                                                                                process.on("unhandledRejection", error => console.error(error));

                                                                                                    if (err) console.log(err);
                                                                                                        if (event.body != null) {
                                                                                                              for (let file of fs.readdirSync(command)) {
                                                                                                                      if (file.endsWith(".js")) {
                                                                                                                                const path = join(command, file);
                                                                                                                                          const script = require(path);
                                                                                                                                                    const input = event.body;
                                                                                                                                                              const text = input.split(" ");
                                                                                                                                                                        text.shift();
                                                                                                                                                                                  const com = event.body.split(" ");
                                                                                                                                                                                            const cmd = com.shift().toLowerCase();

                                                                                                                                                                                                      //functions
                                                                                                                                                                                                                const react = async function react(ok) {
                                                                                                                                                                                                                            api.setMessageReaction(ok, event.messageID, err => {}, true);
                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                                const reply = async function repl(msg) {
                                                                                                                                                                                                                                                            api.sendMessage(msg, event.threadID, event.messageID);
                                                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                                                                const noPermission = async function repl(e) {
                                                                                                                                                                                                                                                                                            return api.sendMessage(
                                                                                                                                                                                                                                                                                                          "Sorry but only admins can use command " + e,
                                                                                                                                                                                                                                                                                                                        event.threadID,
                                                                                                                                                                                                                                                                                                                                      event.messageID
                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                            };
                                                                                                                                                                                                                                                                                                                                                                      //obj
                                                                                                                                                                                                                                                                                                                                                                                const obj = {
                                                                                                                                                                                                                                                                                                                                                                                            react: react,
                                                                                                                                                                                                                                                                                                                                                                                                        api: api,
                                                                                                                                                                                                                                                                                                                                                                                                                    event: event,
                                                                                                                                                                                                                                                                                                                                                                                                                                chat: text,
                                                                                                                                                                                                                                                                                                                                                                                                                                            reply: reply
                                                                                                                                                                                                                                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                //COMMAND HERE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          /*=====AUTO REPLY=====*/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if (script?.auto) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                script.auto(obj);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    /*====================*/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              if (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          cmd == prefix + script.config.name &&
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      script.config.prefix == true &&
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  script.config.permission == 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        noPermission();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if (cmd == script.config.name && script.config.prefix == true) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        return reply(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      "Command " + script.name + " need prefix (" + prefix + ") to use."
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      if (cmd == prefix + script.config.name && script.config.prefix == false) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  return reply(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                "Command " + script.name + " doesn't need prefix to use."
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (cmd == prefix + script.config.name && script.config.prefix == true) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            script.start(obj);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (cmd == script.config.name && script.config.prefix == false) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            script.start(obj);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              } //end of if file ends with .js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    } // end of looping command folder
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } //end of if (event.body != null){}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // events here
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }); //end of listenMqtt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              });