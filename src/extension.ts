import { window, workspace, commands, ExtensionContext } from "vscode";
import * as defaultAffirmations from "./affirmations.json";

// const { window, workspace } = vscode;

let intervalId: NodeJS.Timeout;

const startMySelfAffirmations = () => {
  const config = workspace.getConfiguration("my-self-affirmations");
  const userSuppliedAffirmations = workspace.getConfiguration("my-self-affirmations").get<string[]>("affirmations");
  const affirmations: string[] = userSuppliedAffirmations || defaultAffirmations;
  const unit = config.get<string>("timeInterval.unit");
  const milliseconds =
    config.get<number>("timeInterval.value")! *
    (unit === "s" ? 1000 : unit === "m" ? 60000 : unit === "h" ? 3600000 : 0);
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    window.showInformationMessage(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, milliseconds);

  console.log(userSuppliedAffirmations || defaultAffirmations);
  console.log('Congratulations, your extension "my-self-affirmations" is now active!');
};


export function activate(context: ExtensionContext) {
  const onChangeConfigurationDispoable = workspace.onDidChangeConfiguration((configurationChangeEvent) => {
    if (configurationChangeEvent.affectsConfiguration("my-self-affirmations")) {
      startMySelfAffirmations();
    }
  });
  context.subscriptions.push(onChangeConfigurationDispoable);
  startMySelfAffirmations();
}

export function deactivate() {
  clearInterval(intervalId);
}
