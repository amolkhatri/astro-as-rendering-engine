import { component$, useSignal, $ } from '@builder.io/qwik';

interface CodeDemoProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeDemo = component$<CodeDemoProps>(({ code, language = 'typescript', filename }) => {
  const copied = useSignal(false);

  const copyCode = $(() => {
    navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  });

  return (
    <div class="code-demo">
      <div class="code-demo-header">
        <span class="code-demo-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </span>
        {filename && <span class="code-demo-filename">{filename}</span>}
        <button class="code-demo-copy" onClick$={copyCode}>
          {copied.value ? '✓ copied' : '⧉ copy'}
        </button>
      </div>
      <pre class={`language-${language}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
});

