import { ref, toRef, watch } from "vue";
import { zeroToNArray } from "../utils/utils"

export const useBucket = (length) => {
    const n = toRef(length);
    const pool = ref([]);
    const bucket = ref([]);
    watch(n, reset, {immediate: true})

    function addToBucket(i) {
        const item = pool.value.splice(i, 1)[0];
        bucket.value.push(item);
    }

    function reset() {
        pool.value = zeroToNArray(n.value);
        bucket.value = [];
    }

    return {pool, bucket, addToBucket, reset};
}