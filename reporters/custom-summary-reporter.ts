import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';

class CustomSummaryReporter implements Reporter {
    private totalTests = 0;
    private passedTests = 0;
    private failedTests = 0;
    private flakyTests = 0;
    private skippedTests = 0;
    private startTime: number = 0;

    onBegin(config: FullConfig, suite: Suite) {
        this.startTime = Date.now();
        this.totalTests = suite.allTests().length;
        console.log(`\n======================================================`);
        console.log(`🚀 [CUSTOM REPORTER]: BẮT ĐẦU CHẠY KIỂM THỬ TỔNG CỘNG ${this.totalTests} TESTS`);
        console.log(`======================================================\n`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === 'passed') {
            if (result.retry > 0) {
                this.flakyTests++;
            } else {
                this.passedTests++;
            }
        } else if (result.status === 'failed' || result.status === 'timedOut') {
            this.failedTests++;
        } else if (result.status === 'skipped') {
            this.skippedTests++;
        }
    }

    async onEnd(result: FullResult) {
        const durationInSeconds = ((Date.now() - this.startTime) / 1000).toFixed(2);
        
        console.log(`\n======================================================`);
        console.log(`📊 [TỔNG KẾT BÁO CÁO THỰC THI KIỂM THỬ]`);
        console.log(`⏱️ Thời gian thực thi: ${durationInSeconds} giây`);
        console.log(`✅ Passed: ${this.passedTests}`);
        console.log(`❌ Failed: ${this.failedTests}`);
        console.log(`⚠️ Flaky : ${this.flakyTests}`);
        console.log(`⏭️ Skipped: ${this.skippedTests}`);
        console.log(`🎯 Trạng thái tổng: ${result.status.toUpperCase()}`);
        console.log(`======================================================\n`);

        // Mô phỏng payload gửi qua Webhook (Slack / Discord / Teams)
        const summaryPayload = {
            title: 'PLAYWRIGHT TEST EXECUTION SUMMARY',
            status: result.status,
            total: this.totalTests,
            passed: this.passedTests,
            failed: this.failedTests,
            flaky: this.flakyTests,
            duration: `${durationInSeconds}s`,
            timestamp: new Date().toISOString(),
        };

        console.log('📡 Payload sẵn sàng bắn qua Webhook endpoint:');
        console.log(JSON.stringify(summaryPayload, null, 2));
    }
}

export default CustomSummaryReporter;