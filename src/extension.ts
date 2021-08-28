import { window, workspace, ExtensionContext } from "vscode";
import * as defaultAffirmations from "./affirmations.json";

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
  window.showInformationMessage(affirmations[Math.floor(Math.random() * affirmations.length)]);
  intervalId = setInterval(() => {
    window.showInformationMessage(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, milliseconds);
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
