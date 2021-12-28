<template>
  <div>
    <div class="search-form">
      <p>
        <label for="subject">Title</label>
        <input v-model="searchInput.subject" type="text">
      </p>
      <p>
        <label for="inst_ymdhi">Created at</label>
        <input v-model="searchInput.inst_ymdhi.from" type="date"> 
        ~
        <input v-model="searchInput.inst_ymdhi.to" type="date"> 
      </p>
      <p>
        <label for="ext_col_01">Text</label>
        <input v-model="searchInput.ext_col_01" type="text">
      </p>
      <p>
        <label for="ext_col_02">Select</label>
        <select v-model="searchInput.ext_col_02">
          <option value="">Not selected</option>
          <option value="01">option1</option>
          <option value="02">option2</option>
          <option value="03">option3</option>
        </select>
      </p>
      <p>
        <label for="ext_col_03">Checkbox</label>
        <input v-model="searchInput.ext_col_03" type="checkbox" value="01">option1
        <input v-model="searchInput.ext_col_03" type="checkbox" value="02">option2
        <input v-model="searchInput.ext_col_03" type="checkbox" value="03">option3
      </p>  
      <button type="button" @click="search">Search</button>
    </div>
    <div v-if="Object.keys(searchResult).length > 0" class="search-result">
      <template v-if="(searchResult.errors || []).length === 0">
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created at</th>
            <th>Text</th>
            <th>Select</th>
            <th>Checkbox</th>
          </tr>
          <tr v-for="content in searchResult.list" :key="content.topics_id">
            <td>{{ content.topics_id }}</td>
            <td>{{ content.subject }}</td>
            <td>{{ content.inst_ymdhi }}</td>
            <td>{{ content.ext_col_01 }}</td>
            <td>{{ content.ext_col_02 }}</td>
            <td>{{ content.ext_col_03 }}</td>
          </tr>
        </table>
      </template>
      <template v-else>
        {{ searchResult.errors }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: {
        subject: '',
        inst_ymdhi: {
          from: '',
          to: '',
        },
        ext_col_01: '',
        ext_col_02: '',
        ext_col_03: []
      },
      searchResult: {},
    }
  },
  mounted() {
    this.search();
  },  
  methods: {
  // エンドポイントへのリクエストを行い、取得結果をsearchResultに格納
    search() {
      // 自分の環境で設定したエンドポイントのURLに置き換えてください
      this.$axios.get("https://sample-support-kuroco.a.kuroco.app/rcms-api/14/content", {
        params: {
          filter: this.buildFilterQuery()
        }
      }).then(response => {
        this.searchResult = response.data || {};
      }).catch(({ response }) => {
        this.searchResult = !(response instanceof Object) || !Array.isArray(response.data.errors)
          ? { errors: ['Unexpected error'] }
          : response.data;
      });
    },
    // filterクエリの生成
    buildFilterQuery() {
      const filterQuery = Object.entries(this.searchInput).reduce((queries, [col, value]) => {
        switch (col) {
          // 日付: 範囲指定
          case 'inst_ymdhi':
            if (value.from !== '') {
              queries.push(`${col} >= "${value.from}"`);
            }
            if (value.to !== '') {
              queries.push(`${col} <= "${value.to}"`);
            }
            break;
          // テキスト: 部分一致
          case 'subject':
          case 'ext_col_01':
            if (value !== '') {
              queries.push(`${col} contains "${value}"`);
            }
            break;
          // 選択(select): 完全一致
          case 'ext_col_02':
            if (value !== '') {
              queries.push(`${col} = "${value}"`);
            }
            break;
          // 複数選択(checkbox): 部分一致
          case 'ext_col_03':
            if (value.length > 0) {
              queries.push('(' + value.map(v => `${col} contains "${v}"`).join(' OR ') + ')');
            }
            break;
          default:
            break;
        }
        return queries;
      }, []).join(' AND ');

      return filterQuery;
    }
  }
}
</script>

<style scoped>
.search-form {
  border: 1px solid;
  padding: 10px;
}
.search-form label {
  display: block;
  float: left;
  width: 100px;
}
.search-result {
  width: 100%;
  margin-top: 20px;
}
.search-result table, th, td {
  border: solid 1px;
  border-collapse: collapse;
}
.search-result th, td {
  padding: 5px;
}
.search-result table {
  width: 100%;
}
</style>