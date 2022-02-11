<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="sid"
          label="学号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="120">
      </el-table-column>
      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteById(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      this.$router.push({
        path: '/PageThree',
        query: {
          sid: row.sid
        }
      })
    },
    page(row) {
      alert(row)
    },
    deleteById(row) {
      const that = this
      axios.get("http://localhost:8181/student/deleteById/" + row.sid).then(function (resp) {
        if (resp.data === true) {
          that.$message({
            showClose: true,
            message: '插入成功',
            type: 'success'
          });
        }
        else {
          that.$message.error('插入失败，请检查数据库');
        }
        window.location.reload();
      })
    }
  },

  created() {
    const that = this
    axios.get("http://localhost:8181/student/getStudentList").then(function (resp) {
      that.tableData = resp.data
      that.total = that.tableData.length
      console.log(that.total)
    })
  },

  data() {
    return {
      tableData: null,
      total: null,
      size: 3
    }
  }
}
</script>