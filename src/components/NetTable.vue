<script setup lang="ts">

type S = {
  id: string | number
}
const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  stripe: {
    type: Boolean,
    default: false
  }
})



const slots = useSlots()

// showData: [ ['xxx' , 'xxx' , 'xxx'] , ... ]
const showData = computed(() => {
  const res: Array<Array<string>> = []
  props.data.forEach((item, idx) => {

    // 通过插槽获得需要访问的data的属性
    const prop = (slots as any).default().map((slot: any) => {
      // type='index' :index="indexMthod"
      if (slot.props.type === 'index') {
        const fn = slot.props.index || ((idx: S) => String(idx).padStart(2, '0'))
        return fn
      }
      return slot.props.prop
    })

    // 获得data上相应属性的值数组 prop: [ undefined , 'name' , 'ar.name' , 'al[0].name' , 'dt']
    const valueArr = prop.map((p: string | undefined | Function, j: number) => {

      if (p === undefined) return

      // type='index'的情况prop: [fn , undefined , 'name' , ...]
      if (typeof p === 'function') return p(idx)

      // 处理链式的属性
      let val = item
      p.split('.').forEach(t => {
        // p.split('.'): [ 'al[0]' , 'name' ]
        t.split('[').forEach(s => {
          // t.split('['): ['al' , '0]'] , s: 'al' '0]'
          if (Number.isNaN(parseInt(s))) val = (val as any)[s]
          else val = (val as any)[parseInt(s)]
        })
      })

      // 检查是否有filter
      const filter = (slots as any).default()[j].props.filter
      if (typeof filter === 'function') {
        val = filter(val)
      }

      return val
    })

    res.push(valueArr)
  })

  return res
})

// 获取该列宽度值
const getWidth = (idx: number) => {
  return (slots as any).default()[idx].props.width
}

</script>

<template>
  <div class="net-table">
    <div class="table-container">
      <table>
        <thead>
          <tr class="row">
            <td v-for="item in ($slots as any).default().map((slot: any) => slot.props)"
                :key="item.label"
                :style="{ width: item.width || '0', flex: item.width ? 'initial' : 1 }"
                class="col ellipsis">
              {{ item.label }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr class="row" v-for="(row, idx) in showData" :key="idx"
              :class="{ 'stripe': stripe && idx % 2 === 0 }">
            <td v-for="(item, i) in row" :key="i" class="col ellipsis"
                :style="{ width: getWidth(i) || '0', flex: getWidth(i) ? 'initial' : 1 }">
              <template v-if="item">
                {{ item }}
              </template>
              <template v-else>
                <slot />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="less" scoped>
.net-table {

  .table-container {
    table {
      width: 100%;
      font-size: 14px;
      color: #656565;

      thead {
        color: #888888;
      }

      tbody {
        tr {
          &:hover {
            background-color: var(--gray);
            cursor: pointer;
          }
        }
      }

      tr {
        padding: 0 10px;
        display: flex;

        td {
          padding: 10px 0;
        }

        &.stripe {
          background-color: var(--light-gray);
          border-radius: 10px;
        }


      }
    }
  }
}
</style>
