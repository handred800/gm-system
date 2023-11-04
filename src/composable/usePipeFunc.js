import { flow } from 'lodash';
import { ref, computed } from "vue";

export const usePipeFunc = (maxLength) => {
    const max = ref(maxLength);
    const pipe = ref([]);
    const remaining = computed(() => max.value - pipe.value.length);
    const pipeFunc = computed(() => flow(pipe.value));

    const add = (item) => {
        if (remaining.value <= 0) {
            throw new Error('exceeded pipe max length');
        } else {
            pipe.value.push(item);
        }
    }

    const remove = () => {
        if (pipe.value.length <= 0) {
            throw new Error('pipe is empty')
        } else {
            pipe.value.pop();
        }
    }

    const reset = () => pipe.value = [];

    return { pipeFunc, add, remove, reset, remaining };
}