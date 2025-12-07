import { component$, useSignal } from '@builder.io/qwik';

export const Counter = component$(({ initialCount }: { initialCount: number }) => {

    const count = useSignal(initialCount);
	return <div>Counter: {count.value}
    <button onClick$={() => count.value++}>Increment</button>
    </div>;
})