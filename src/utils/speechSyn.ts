const synth = window.speechSynthesis;

export type IVoiceConfig = Pick<SpeechSynthesisUtterance, 'voice' | 'pitch' | 'rate'>

/** 语音列表 */
let voicesList: SpeechSynthesisVoice[] = synth.getVoices();
/** 语音类型 */
let voiceType = {} as SpeechSynthesisVoice
/** 语音设置 */
let voiceConfig = {} as IVoiceConfig

/** 设置语音类型 */
function setVoiceType (voice: SpeechSynthesisVoice) {
  voiceType = {...voiceType, ...voice}
}

/** 设置语音属性 */
function setVoiceConfig (config: IVoiceConfig) {
  voiceConfig = {...voiceConfig, ...config}
}

/** 发声 */
function speak (content: string) {
  let voiceUnit = new SpeechSynthesisUtterance(content);
  // voiceUnit = {...voiceUnit, ...voiceConfig}
  synth.speak(voiceUnit);
}
 
export default {
  voicesList,
  setVoiceType,
  setVoiceConfig,
  speak
}