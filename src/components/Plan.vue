<template>
  <div class="dialog-body">
    <el-form :rules="rules" ref="form" :model="form" label-width="90px" size="mini">
      <h4>新增计划</h4>
      <el-row>
        <el-col :span="7">
          <el-form-item label="账户名称" prop="advertiserId">
            <el-select :disabled="status === 'edit1'" style="width:100%" v-model="form.advertiserId" placeholder="请选择">
              <el-option v-for="(item,key) in actList" :key="key" :label="item.advertiserName" :value="item.advertiserId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="计划id" prop="adId">
            <el-input v-model="form.adId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="计划名称" prop="adName">
            <el-input v-model="form.adName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :multiple="false"
            :action="uploadUrl"
            :show-file-list="false"
            :auto-upload="true"
            name="multipartFile"
            :on-success="handleAvatarSuccess"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload">
            <el-button style="margin-left:10px;" size="mini">批量上传</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="">
          <el-button @click="addPlan" type="primary" size="mini">确认添加</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <hr />

    <el-form ref="search" :model="search" label-width="90px" size="mini">
      <h4>查询计划</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item label="媒体名称">
            <el-select :disabled="status === 'edit1'" style="width:100%" v-model="search.mediaName" placeholder="请选择">
              <el-option v-for="(item,key) in mediaList" :key="key" :label="item.mediaName" :value="item.mediaType"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型">
            <el-select :disabled="status === 'edit1'" style="width:100%" v-model="search.type" placeholder="请选择">
              <el-option label="站内" value="ZN"></el-option>
              <el-option label="穿山甲" value="CSJ"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账户名称">
            <el-input v-model="search.advertiserName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="计划id">
            <el-input v-model="search.adId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划名称">
            <el-input v-model="search.adName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button style="margin-left:20px;" @click="query" type="primary" size="mini">查询</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      height="250"
      ref="multipleTable"
      v-loading="loading"
      border
      stripe
      header-row-class-name="theadbg"
      :data="tableData">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="mediaName" label="媒体名称"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="advertiserName" label="账户名称"></el-table-column>
      <el-table-column prop="adId" label="计划ID"></el-table-column>
      <el-table-column prop="adName" label="计划名称"></el-table-column>
      <el-table-column label="最近一次操作日期">
        <template slot-scope="scope">
          {{scope.row.dateUpdated | date}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作人" width="120"></el-table-column> -->
      <el-table-column label="操作" width="70">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pager" ref="pager" style="margin-top:10px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.start"
        :page-sizes="[50, 100, 200, 300]"
        :page-size="search.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRows"
      ></el-pagination>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TdServer from '@/servers/td' // 相关server
import API from '@/servers/api' // 相关server

export default {
  props: ['status', 'data'],
  components: {

  },
  data () {
    return {
      uploadUrl: API.UPLOAD_PLAN,
      loading: false,
      tableData: [],
      totalRows: 0,
      fileData: {

      },
      form: {},
      search: {
        start: 0,
        length: 10
      },
      rules: {
        advertiserId: [
          { required: true, message: '请选择账户', trigger: 'blur' }
        ],
        adId: [
          { required: true, message: '请输入计划id', trigger: 'blur' }
        ],
        adName: [
          { required: true, message: '请输入计划名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('td', ['actList', 'mediaList'])
  },
  methods: {
    ...mapActions('td', ['getActList', 'getMediaList']),
    close () {
      this.$emit('close')
    },
    save () {
      // edit0 新增   edit1 编辑
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form))
          if (this.status === 'edit0') {
            form.id = ''
          }
          form.value1 = encodeURIComponent(form.value1)
          TdServer.saveWelcome({
            ...form
          }).then(res => {
            if (res.flag === 'S') {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$eventBus.$emit('refresh')
              this.close()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    handleSizeChange (val) {
      this.search.length = val
      this.renderDatble()
    },
    handleCurrentChange (val) {
      this.search.start = val
      this.renderDatble()
    },
    handleAvatarChange (file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
    },
    handleAvatarSuccess (res, file) {
      if (res.flag === 'S') {
        this.$message({
          type: 'success',
          message: '上传成功!'
        })
        this.query()
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 100
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      return isLt1M
    },
    renderDatble () {
      this.loading = true
      TdServer.queryPlanList({
        ...this.search
      }).then(res => {
        if (res.flag === 'S') {
          this.loading = false
          this.tableData = res.data.rows
          this.totalRows = res.data.total
        }
      })
    },
    query () {
      this.search.start = 0
      this.renderDatble()
    },
    del (row) {
      this.$confirm('此操作将永久删除该计划, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        TdServer.delPlan({
          id: row.id
        }).then(res => {
          if (res.flag === 'S') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.query()
          }
        })
      }).catch(() => {

      })
    },
    addPlan () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          TdServer.addPlan({
            ...this.form
          }).then(res => {
            if (res.flag === 'S') {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.query()
            }
          })
        }
      })
    }
  },
  filters: {
    date: function (value) {
      if (!value || value === '') {
        return ''
      }
      var date = new Date(value)
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      var fmt = 'yyyy-MM-dd hh:mm:ss'
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    }
  },
  watch: {

  },
  mounted () {
    this.query()
    this.getMediaList()
    // this.$eventBus.$on('editStyle',this.init);
    // this.$eventBus.$on('resetStyle',this.reset);
  },
  beforeDestroy () {
    // this.$eventBus.$off('editStyle',this.init);
    // this.$eventBus.$off('resetStyle',this.reset);
  }
}

</script>

<style lang="less" scope>
  .dialog-body{
    margin:-30px 0 0 0;
  }
  hr{
    border-top:1px solid #f0f0f0
  }
</style>
