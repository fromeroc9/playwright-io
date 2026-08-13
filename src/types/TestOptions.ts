import { IOConfig, IOCapabilities, RecorderOptions, IOServices } from ".";
import { PlaywrightTestOptions } from "@playwright/test";

/**
 * Test configuration options for Playwright-IO framework.
 * Extends Playwright with WebDriverIO capabilities and automation services.
 */
export interface TestOptions extends PlaywrightTestOptions, IOCapabilities {
    /**
     * WebDriverIO configuration settings (timeouts, URLs, connection options).
     * Excludes TestRunnerOptions & Hooks - handled by Playwright.
     * @see https://webdriver.io/docs/configuration
     */
    config: Partial<IOConfig>;

    /** WebDriverIO services for automation tasks */
    services: IOServices[];

    /** 
     * @deprecated
     * Screen recording during test execution - boolean or detailed RecorderOptions */
    recordingScreen: RecorderOptions | boolean;

    /** Screen recording during test execution - boolean or detailed RecorderOptions */
    takeVideo: RecorderOptions | boolean;

    /** Custom HTML template string for the device viewer in UI mode */
    deviceViewer?: string;

    /** Automatic screenshot capture on test failures */
    takeScreenshot: boolean;
}